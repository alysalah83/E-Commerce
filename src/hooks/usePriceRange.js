import { useQuery } from "@tanstack/react-query";
import { getProductPriceRange } from "../lib/data-service";

export function usePriceRange() {
  const { data, isPending, error } = useQuery({
    queryKey: ["priceRange"],
    queryFn: getProductPriceRange,
    staleTime: 10 * 60 * 1000,
  });

  return {
    highestPrice: data?.highestPrice,
    lowestPrice: data?.lowestPrice,
    isPending,
    error,
  };
}
