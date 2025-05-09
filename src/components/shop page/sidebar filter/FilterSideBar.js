"use client";

import SideBarPrice from "./SideBarPrice";
import FilterClear from "./FilterClear";
import { FiltersProvider } from "@/src/contexts/FiltersProvider";
import { useCategories } from "@/src/hooks/useCategories";
import { usePriceRange } from "@/src/hooks/usePriceRange";
import SideBarCategories from "./SideBarCategories";

function FilterSideBar() {
  const { highestPrice, lowestPrice, isPending, error } = usePriceRange();
  const { categories, isPending: isPending2, error: error2 } = useCategories();

  if (isPending || isPending2) return;

  return (
    <aside className="flex flex-col gap-9 lg:min-w-2xs">
      <FiltersProvider
        highestPriceValue={highestPrice}
        lowestPriceValue={lowestPrice}
        categories={categories}
      >
        <FilterClear />
        <SideBarCategories />
        <SideBarPrice />
      </FiltersProvider>
    </aside>
  );
}

export default FilterSideBar;
