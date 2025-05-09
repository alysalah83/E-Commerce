"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(itemKey) {
  const [localStorageItems, setLocalStorageItems] = useState([]);

  useEffect(() => {
    setLocalStorageItems(JSON.parse(localStorage.getItem(itemKey)) || []);
  }, [itemKey]);

  const handleLocalAddItem = (value) => {
    setLocalStorageItems((cur) => {
      if (cur?.some((obj) => obj?.value === value)) return cur;

      const newValue = [...cur, { value }];

      console.log(newValue);
      localStorage.setItem(itemKey, JSON.stringify(newValue));

      return newValue;
    });
  };

  const handleLocalRemoveItem = (value) => {
    setLocalStorageItems((cur) => {
      const newValues = cur.filter((obj) => obj.value !== value);
      localStorage.setItem(itemKey, JSON.stringify(newValues));
      return newValues;
    });
  };

  return { localStorageItems, handleLocalAddItem, handleLocalRemoveItem };
}
