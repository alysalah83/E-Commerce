"use client";

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductsByIds,
  getUserProducts,
  updateUserCartOrWhitelist,
  UserProductCount,
} from "../lib/data-service";

const createHybridStorageContext = (ContextName) => {
  const HybridContext = createContext(null);

  function HybridProvider({ children, localKey, session }) {
    const queryClient = useQueryClient();
    const [itemsLocal, setItemsLocal] = useState([]);
    const [showPanel, setShowPanel] = useState(false);

    const {
      data: items,
      isPending,
      refetch,
    } = useQuery({
      queryFn: () => {
        if (session)
          return getUserProducts({
            email: session.user.email,
            key: localKey,
          });
        else return getProductsByIds(itemsLocal);
      },
      queryKey: [session?.user.email, `${ContextName}Products`, itemsLocal],
      staleTime: 60 * 60 * 1000,
    });

    useEffect(() => {
      const storedItems = localStorage.getItem(localKey);
      setItemsLocal(storedItems ? JSON.parse(storedItems) : []);
    }, [localKey]);

    //for sync the state with localStorage on every state change
    useEffect(() => {
      if (
        itemsLocal?.length > 0 ||
        JSON.parse(localStorage.getItem(localKey))?.length === 1
      )
        localStorage.setItem(localKey, JSON.stringify(itemsLocal));
    }, [itemsLocal, localKey]);

    //for sync the localStorage with state on every localstorage change
    useEffect(() => {
      const handelStorage = function (e) {
        if (e.key === localKey) setItemsLocal(JSON.parse(e.newValue) || []);
      };

      window.addEventListener("storage", handelStorage);

      return () => window.removeEventListener("storage", handelStorage);
    }, [itemsLocal, localKey]);

    useEffect(() => {
      if (!session || itemsLocal.length === 0) return;

      const syncWithServer = async () => {
        await updateUserCartOrWhitelist({
          email: session.user.email,
          key: localKey,
          items: itemsLocal,
          action: "merge",
        });
        setItemsLocal([]);
      };

      syncWithServer();
    }, [session?.user?.email, localKey, itemsLocal]);

    const handleTogglePanel = useCallback(
      () => setShowPanel((cur) => !cur),
      [],
    );

    const addToLocal = useCallback(
      (productId, count = 1) => {
        if (session) {
          const addToServer = async () => {
            await updateUserCartOrWhitelist({
              items: { id: productId, count },
              email: session.user.email,
              key: localKey,
              action: "add",
            });
            refetch();
          };

          addToServer();
        } else
          setItemsLocal((currentItems) => {
            if (currentItems.some((item) => item.id === productId))
              return currentItems;

            return [...currentItems, { id: productId, count }];
          });
      },
      [session, queryClient, localKey],
    );

    const removeFromLocal = useCallback(
      (productId) => {
        if (session) {
          const removeFromServer = async () => {
            await updateUserCartOrWhitelist({
              items: { id: productId },
              email: session.user.email,
              key: localKey,
              action: "remove",
            });
            refetch();
          };

          removeFromServer();
        } else
          setItemsLocal((currentItems) => {
            const newItems = currentItems.filter(
              (item) => item.id !== productId,
            );
            return newItems;
          });
      },
      [session, queryClient, localKey],
    );

    const itemsCount = useMemo(() => items?.length || 0, [items]);

    const checkAddedItem = useCallback(
      (productId) => {
        return items?.some((item) => item.id === productId);
      },
      [items],
    );

    const getItemCount = useCallback(
      (productId) => {
        if (session)
          return items?.find((item) => item.id === productId)?.count || 1;
        else
          return itemsLocal.find((item) => item.id === productId)?.count || 1;
      },
      [itemsLocal, items, session],
    );

    const itemsBalance = useMemo(
      () =>
        items?.length === 0
          ? 0
          : Math.round(
              items?.reduce((acc, cur) => {
                const count = getItemCount(cur.id);
                return acc + cur.price * count;
              }, 0),
            ) || 0,
      [items, getItemCount],
    );

    const updateCount = useCallback(
      (productId, count) => {
        if (session) {
          const updateServer = async () => {
            await updateUserCartOrWhitelist({
              items: { id: productId, count },
              email: session.user.email,
              key: localKey,
              action: "update",
            });
            refetch();
          };

          updateServer();
        } else
          setItemsLocal((curCart) =>
            curCart.map((item) =>
              item.id === productId ? { ...item, count } : item,
            ),
          );
      },
      [session, queryClient, localKey],
    );

    console.log(`${localKey}Provider-re-rendered`);

    const contextValue = useMemo(
      () => ({
        items,
        isPending,
        itemsLocal,
        itemsCount,
        itemsBalance,
        addToLocal,
        getItemCount,
        updateCount,
        removeFromLocal,
        checkAddedItem,
        showPanel,
        handleTogglePanel,
      }),
      [
        items,
        isPending,
        itemsLocal,
        itemsCount,
        itemsBalance,
        addToLocal,
        getItemCount,
        updateCount,
        removeFromLocal,
        checkAddedItem,
        showPanel,
        handleTogglePanel,
      ],
    );

    return <HybridContext value={contextValue}>{children}</HybridContext>;
  }

  function useHybridStorage() {
    const values = useContext(HybridContext);
    if (!values)
      throw new Error(
        `use${ContextName} must be used within a ${ContextName}Provider`,
      );
    return values;
  }

  return {
    Provider: memo(HybridProvider),
    useHybridStorage,
  };
};

export const { Provider: CartProvider, useHybridStorage: useCart } =
  createHybridStorageContext("Cart");

export const { Provider: WhitelistProvider, useHybridStorage: useWhitelist } =
  createHybridStorageContext("WhiteList");
