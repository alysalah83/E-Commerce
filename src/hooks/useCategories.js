import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../lib/data-service";

export function useCategories() {
  const { data, isPending, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
  });

  return { categories: data, isPending, error };
}
