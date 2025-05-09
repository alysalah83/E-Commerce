"use client";

import { useFilters } from "@/src/contexts/FiltersProvider";

function FilterClear() {
  const { clearFilters } = useFilters();
  return (
    <div className="flex justify-between rounded-md bg-white px-5 py-4 shadow-md">
      <span className="font-semibold text-gray-600">Filters:</span>
      <button
        onClick={clearFilters}
        className="cursor-pointer font-semibold text-blue-600"
      >
        Clean All
      </button>
    </div>
  );
}

export default FilterClear;
