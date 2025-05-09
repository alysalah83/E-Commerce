"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { usePriceRange } from "../hooks/usePriceRange";
import { PAGINATION_ITEMS_PER_PAGE } from "../lib/config";
import { useFilteredProducts } from "../hooks/useFilteredProducts";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const [isLayoutGrid, setIsLayoutGrid] = useState(true);

  const date = searchParams.get("date") || "latestProducts";
  const [filterDate, setFilterDate] = useState(date);

  const { highestPrice, lowestPrice, isPending } = usePriceRange();

  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category");
  const minParam = searchParams.get("min");
  const min = minParam !== null ? Number(minParam) : lowestPrice;
  const maxParam = searchParams.get("max");
  const max = maxParam !== null ? Number(maxParam) : highestPrice;
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;
  const params = new URLSearchParams(searchParams);

  useEffect(
    function () {
      const currentDate = searchParams.get("date") || "latestProducts";
      if (filterDate === currentDate) return;

      params.set("date", filterDate);
      push(`${pathname}?${params.toString()}`, { scroll: true });
    },
    [filterDate, pathname, push, searchParams],
  );

  const {
    products,
    productsCount,
    isPending: isProductsPending,
  } = useFilteredProducts(page, category, min, max, date);

  const handleLayoutToggle = () => setIsLayoutGrid((cur) => !cur);
  const handleToggleDate = (e) => setFilterDate(e.target.value);

  const productsCountPerPage =
    Math.ceil(productsCount / itemsPerPage) === page
      ? (productsCount % itemsPerPage) + (page - 1) * itemsPerPage
      : page * itemsPerPage;

  return (
    <ProductsContext
      value={{
        products,
        productsCount,
        productsCountPerPage,
        isProductsPending,
        isLayoutGrid,
        handleLayoutToggle,
        filterDate,
        handleToggleDate,
      }}
    >
      {children}
    </ProductsContext>
  );
}

export function useProducts() {
  const values = useContext(ProductsContext);
  if (values === undefined)
    throw new Error("the Products provider is being used outside of its scope");
  return values;
}
