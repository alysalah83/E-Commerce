import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsGuest,
  setItems,
  addItem,
  removeItem,
  updateItemCount,
  togglePanel,
  markAsSynced,
} from "../store/cartSlice";
import {
  useAddToUserCartMutation,
  useGetProductsByIdsQuery,
  useGetUserCartQuery,
  useRemoveFromUserCartMutation,
  useSyncCartToUserMutation,
  useUpdateCartItemMutation,
} from "../store/api";

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { data: session } = useSession();

  const isGuest = !session?.user?.email;
  const userEmail = session?.user?.email;

  const [addToUserCart, { isLoading: isAddingToCart }] =
    useAddToUserCartMutation();
  const [updateCartItem, { isLoading: isUpdatingCart }] =
    useUpdateCartItemMutation();
  const [removeFromUserCart, { isLoading: isRemovingFromCart }] =
    useRemoveFromUserCartMutation();
  const [syncCartToUser, { isLoading: isSyncing }] =
    useSyncCartToUserMutation();

  const productIds = useMemo(
    () => cart.items.map((item) => item.id),
    [cart.items],
  );
  const { data: guestProducts, isLoading: guestLoading } =
    useGetProductsByIdsQuery(productIds, {
      skip: !isGuest || productIds.length === 0,
    });

  const { data: userCartData, isLoading: userCartLoading } =
    useGetUserCartQuery(userEmail, {
      skip: isGuest || !userEmail,
    });

  useEffect(() => {
    dispatch(setIsGuest(isGuest));
  }, [isGuest, dispatch]);

  useEffect(() => {
    if (isGuest) {
      try {
        const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
        dispatch(setItems(Array.isArray(storedItems) ? storedItems : []));
      } catch {
        dispatch(setItems([]));
      }
    }
  }, [isGuest, dispatch]);

  useEffect(() => {
    if (isGuest && cart.items.length > 0)
      localStorage.setItem("cart", JSON.stringify(cart.items));
  }, [isGuest, cart.items]);

  useEffect(() => {
    if (
      !isGuest &&
      userEmail &&
      !cart.hasSynced &&
      cart.lastSyncedEmail !== userEmail
    ) {
      const guestItems = JSON.parse(localStorage.getItem("cart") || "[]");

      if (guestItems.length > 0) {
        syncCartToUser({ email: userEmail, items: guestItems })
          .unwrap()
          .then(() => {
            localStorage.removeItem("cart");
            dispatch(markAsSynced(userEmail));
          })
          .catch((error) => {
            console.error("Failed to sync cart to user:", error);
          });
      } else {
        dispatch(markAsSynced(userEmail));
      }
    }
  }, [
    isGuest,
    userEmail,
    cart.hasSynced,
    cart.lastSyncedEmail,
    syncCartToUser,
    dispatch,
  ]);

  useEffect(() => {
    if (!isGuest && cart.hasSynced && userCartData) {
      const cartItems = userCartData.map((item) => ({
        id: item.id,
        count: item.count,
      }));
      dispatch(setItems(cartItems));
    }
  }, [userCartData, isGuest, cart.hasSynced, dispatch]);

  const handleAddItem = useCallback(
    async (productId, count = 1) => {
      dispatch(addItem({ id: productId, count }));

      if (!isGuest) {
        try {
          await addToUserCart({ email: userEmail, productId, count }).unwrap();
        } catch (error) {
          console.error("Failed to add item:", error);
        }
      }
    },
    [dispatch, addToUserCart, userEmail, isGuest],
  );

  const handleRemoveItem = useCallback(
    async (productId) => {
      dispatch(removeItem(productId));

      if (!isGuest) {
        try {
          await removeFromUserCart({ email: userEmail, productId }).unwrap();
        } catch (error) {
          console.error("Failed to remove item:", error);
        }
      }
    },
    [dispatch, removeFromUserCart, userEmail, isGuest],
  );

  const handleUpdateCount = useCallback(
    async (productId, count) => {
      if (count <= 0) {
        handleRemoveItem(productId);
        return;
      }

      dispatch(updateItemCount({ id: productId, count }));

      if (!isGuest) {
        try {
          await updateCartItem({ email: userEmail, productId, count }).unwrap();
        } catch (error) {
          console.error("Failed to update item:", error);
        }
      }
    },
    [dispatch, updateCartItem, userEmail, isGuest, handleRemoveItem],
  );

  const handleActions = useCallback(
    ({ action, productId, count }) => {
      switch (action) {
        case "addItem":
          handleAddItem(productId, count);
          break;
        case "updateItem":
          handleUpdateCount(productId, count);
          break;
        case "removeItem":
          handleRemoveItem(productId);
          break;
        default:
          throw new Error("Invalid action");
      }
    },
    [handleAddItem, handleUpdateCount, handleRemoveItem],
  );

  const products = isGuest ? guestProducts : userCartData;
  const isLoading = isGuest ? guestLoading : userCartLoading;
  const isUpdating =
    isAddingToCart || isUpdatingCart || isRemovingFromCart || isSyncing;

  const getItemCount = useCallback(
    (productId) => cart.items.find((i) => i.id === productId)?.count || 0,
    [cart.items],
  );

  const isInCart = useCallback(
    (productId) => cart.items.some((i) => i.id === productId),
    [cart.items],
  );

  const totalItems = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.count, 0),
    [cart.items],
  );

  const totalPrice = useMemo(() => {
    if (!products || products.length === 0) return 0;
    return Math.round(
      products.reduce((sum, product) => {
        const cartItem = cart.items.find((i) => i.id === product.id);
        return sum + (product.price || 0) * (cartItem?.count || 0);
      }, 0),
    );
  }, [products, cart.items]);

  return {
    items: cart.items,
    products,
    totalItems,
    totalPrice,
    showPanel: cart.showPanel,
    isGuest,

    isLoading,
    isUpdating,

    handleActions,

    getItemCount,
    isInCart,
  };
}
