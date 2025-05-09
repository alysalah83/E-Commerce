"use client";

import { createContext, use, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FilterContext = createContext(null);

function FiltersProvider({
  children,
  highestPriceValue,
  lowestPriceValue,
  categories,
}) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  // Initialize URLSearchParams with current search params
  const params = new URLSearchParams(searchParams);

  const [checkedCategories, setCheckedCategories] = useState(() => {
    const initCategoryParams = params.get("category");
    return initCategoryParams
      ? initCategoryParams
          .split("_")
          .filter(Boolean)
          .reduce((acc, cur) => ({ ...acc, [cur]: true }), {})
      : {};
  });

  const [priceRange, setPriceRange] = useState({
    min: Number(params.get("min")) || lowestPriceValue,
    max: Number(params.get("max")) || highestPriceValue,
  });

  const handleCheckboxChange = useCallback((category) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  useEffect(() => {
    const activeCategories = Object.entries(checkedCategories)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    const currentCategories = searchParams.get("category")?.split("_") || [];

    if (
      activeCategories.length === currentCategories.length &&
      activeCategories.every((cat, i) => cat === currentCategories[i])
    )
      return;

    const newParams = new URLSearchParams(searchParams);

    if (activeCategories.length > 0) {
      newParams.set("category", activeCategories.join("_"));
      newParams.set("page", 1);
    } else newParams.delete("category");

    push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [checkedCategories, pathname, push, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentMin = Number(searchParams.get("min")) || lowestPriceValue;
      const currentMax = Number(searchParams.get("max")) || highestPriceValue;

      if (currentMin === priceRange.min && currentMax === priceRange.max)
        return;

      if (
        priceRange.min === lowestPriceValue &&
        priceRange.max === highestPriceValue
      )
        return;

      const newParams = new URLSearchParams(searchParams);

      if (priceRange.min !== lowestPriceValue) {
        newParams.set("min", priceRange.min);
        newParams.set("page", 1);
      } else newParams.delete("min");

      if (priceRange.max !== highestPriceValue) {
        newParams.set("max", priceRange.max);
        newParams.set("page", 1);
      } else newParams.delete("max");

      push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    priceRange,
    pathname,
    push,
    searchParams,
    lowestPriceValue,
    highestPriceValue,
  ]);

  const clearFilters = useCallback(() => {
    setCheckedCategories({});
    setPriceRange({
      min: lowestPriceValue,
      max: highestPriceValue,
    });
  }, [lowestPriceValue, highestPriceValue]);

  const value = {
    checkedCategories,
    handleCheckboxChange,
    initMin: lowestPriceValue,
    initMax: highestPriceValue,
    min: priceRange.min,
    max: priceRange.max,
    setPriceRange,
    clearFilters,
    categories,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

const useFilters = () => {
  const context = use(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};

export { FiltersProvider, useFilters };
