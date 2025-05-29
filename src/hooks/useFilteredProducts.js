"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../lib/data-service";

export function useFilteredProducts(
  page,
  categoryParams,
  minPrice,
  maxPrice,
  date,
) {
  const { data, isPending, error } = useQuery({
    queryFn: () =>
      getFilteredProducts(page, categoryParams, minPrice, maxPrice, date),
    queryKey: ["products", page, categoryParams, minPrice, maxPrice, date],
    staleTime: 0,
  });

  return {
    products: data?.products,
    productsCount: data?.productsCount,
    isPending,
    error,
  };
}
