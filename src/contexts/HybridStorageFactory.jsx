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
import {
  getProductsByIds,
  getUserProducts,
  updateUserCartOrWhitelist,
} from "../lib/data-service";
import { useSession } from "next-auth/react";

const createHybridStorageContext = (ContextName) => {
  const HybridContext = createContext(null);

  function HybridProvider({ children, localKey: key }) {
    const [itemsLocal, setItemsLocal] = useState([]);
    const [showPanel, setShowPanel] = useState(false);
    const data = useSession();
    const session = data?.data;
    const {
      data: items,
      isPending,
      refetch,
    } = useQuery({
      queryFn: () => {
        if (session)
          return getUserProducts({
            email: session.user.email,
            key,
          });
        else return getProductsByIds(itemsLocal);
      },
      queryKey: [session?.user?.email, `${ContextName}Products`, itemsLocal],
      staleTime: 60 * 60 * 1000,
    });

    useEffect(() => {
      const storedItems = localStorage.getItem(key);
      setItemsLocal(storedItems ? JSON.parse(storedItems) : []);
    }, [key]);

    useEffect(() => {
      if (
        itemsLocal?.length > 0 ||
        JSON.parse(localStorage.getItem(key))?.length === 1
      )
        localStorage.setItem(key, JSON.stringify(itemsLocal));
    }, [itemsLocal, key]);

    useEffect(() => {
      const handelStorage = function (e) {
        if (e.key === key) setItemsLocal(JSON.parse(e.newValue) || []);
      };

      window.addEventListener("storage", handelStorage);

      return () => window.removeEventListener("storage", handelStorage);
    }, [itemsLocal, key]);

    useEffect(() => {
      if (!session || itemsLocal.length === 0) return;

      const syncWithServer = async () => {
        await updateUserCartOrWhitelist({
          email: session.user.email,
          key,
          items: itemsLocal,
          action: "mergeItems",
        });
        setItemsLocal([]);
      };

      syncWithServer();
    }, [session?.user?.email, key, itemsLocal]);

    const handleTogglePanel = useCallback(
      () => setShowPanel((cur) => !cur),
      [],
    );

    const handleActions = useCallback(
      function ({ action, productId, count = 1 }) {
        const isAuth = !!session?.user?.email;
        const payLoad = {
          item: { id: productId, count },
          email: session?.user?.email,
          key,
          action,
        };

        switch (action) {
          case "addItem":
            if (isAuth) {
              const addToServer = async () => {
                await updateUserCartOrWhitelist(payLoad);
                refetch();
              };
              addToServer();
            } else
              setItemsLocal((currentItems) => {
                if (currentItems.some((item) => item.id === productId))
                  return currentItems;

                return [...currentItems, { id: productId, count }];
              });
            break;
          case "updateItem":
            if (isAuth) {
              const updateServer = async () => {
                await updateUserCartOrWhitelist(payLoad);
                refetch();
              };
              updateServer();
            } else
              setItemsLocal((curCart) =>
                curCart.map((item) =>
                  item.id === productId ? { ...item, count } : item,
                ),
              );
            break;
          case "removeItem":
            if (session) {
              const removeFromServer = async () => {
                await updateUserCartOrWhitelist(payLoad);
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
            break;
          default: {
            throw new Error("inValid action");
          }
        }
      },
      [session, key, refetch],
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
          return itemsLocal?.find((item) => item.id === productId)?.count || 1;
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

    const contextValue = useMemo(
      () => ({
        items,
        isPending,
        itemsLocal,
        itemsCount,
        itemsBalance,
        handleActions,
        getItemCount,
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
        handleActions,
        getItemCount,
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

export const { Provider: WhitelistProvider, useHybridStorage: useWhitelist } =
  createHybridStorageContext("WhiteList");
