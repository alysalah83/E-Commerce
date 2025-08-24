import { useQuery } from "@tanstack/react-query";
import { getSearchItems } from "../lib/data-service";

export function useSearchItems(query) {
  const { data, isPending, error } = useQuery({
    queryFn: () => getSearchItems(query),
    queryKey: ["searchItems", query],
    keepPreviousData: true,
  });

  return { items: data, isPending, error };
}
