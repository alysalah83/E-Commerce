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
import { useQuery } from "@tanstack/react-query";
import { getProductsByIds } from "../lib/data-service";

// factory function to generate contexts that use local storage to set array of object inside it

const createHybridStorageContext = (ContextName) => {
  const HybridContext = createContext(null);

  function HybridProvider({ children, localKey }) {
    const [itemsLocal, setItemsLocal] = useState([]);
    const [showPanel, setShowPanel] = useState(false);

    const { data: items, isPending } = useQuery({
      queryFn: () => getProductsByIds(itemsLocal),
      queryKey: [
        `${ContextName}Products`,
        { ids: itemsLocal.map((item) => item.id).toSorted() },
      ],
      staleTime: 60 * 60 * 1000,
    });

    useEffect(() => {
      const storedItems = localStorage.getItem(localKey);
      setItemsLocal(storedItems ? JSON.parse(storedItems) : []);
    }, []);

    const handleTogglePanel = useCallback(
      () => setShowPanel((cur) => !cur),
      [],
    );

    const addToLocal = useCallback((productId, count = 1) => {
      setItemsLocal((currentItems) => {
        if (currentItems.some((item) => item.id === productId))
          return currentItems;

        return [...currentItems, { id: productId, count }];
      });
    }, []);

    const removeFromLocal = useCallback((productId) => {
      setItemsLocal((currentItems) => {
        const newItems = currentItems.filter((item) => item.id !== productId);

        return newItems;
      });
    }, []);

    const itemsCount = useMemo(() => items?.length || 0, [items]);

    const checkAddedItem = useCallback(
      (productId) => {
        return items?.some((item) => item.id === productId);
      },
      [items],
    );

    //for sync the state with localStorage on every state change
    useEffect(() => {
      if (
        itemsLocal?.length > 0 ||
        JSON.parse(localStorage.getItem(localKey))?.length === 1
      )
        localStorage.setItem(localKey, JSON.stringify(itemsLocal));
    }, [itemsLocal]);

    //for sync the localStorage with state on every localstorage change
    useEffect(() => {
      const handelStorage = function (e) {
        if (e.key === localKey) setItemsLocal(JSON.parse(e.newValue) || []);
      };

      window.addEventListener("storage", handelStorage);

      return () => window.removeEventListener("storage", handelStorage);
    }, [itemsLocal, localKey]);

    const getItemCount = useCallback(
      (productId) =>
        itemsLocal.find((item) => item.id === productId)?.count || 1,
      [itemsLocal],
    );

    const itemsBalance = useMemo(
      () =>
        items?.length === 0
          ? 0
          : Math.round(
              items?.reduce((acc, cur) => {
                const count = Number(getItemCount(cur.id));
                return acc + cur.price * count;
              }, 0),
            ) || 0,
      [items, getItemCount],
    );

    const updateCount = useCallback((productId, count) =>
      setItemsLocal(
        (curCart) =>
          curCart.map((item) =>
            item.id === productId ? { ...item, count } : item,
          ),
        [],
      ),
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
