"use client";

import { useFilters } from "@/src/contexts/FiltersProvider";
import ToggleMenu from "./ToggleMenu";
import { useState } from "react";
import SideBarCategoryRow from "./SideBarCategoryRow";

function SideBarCategories() {
  const { categories, checkedCategories, handleCheckboxChange } = useFilters();

  const [toggle, setToggle] = useState(true);
  const handleToggle = () => setToggle((cur) => !cur);

  return (
    <div className="rounded-md bg-white shadow-md">
      <ToggleMenu label="Category" toggle={toggle} onClick={handleToggle} />

      {toggle && (
        <menu className="flex flex-col gap-4.5 px-6 py-6">
          {categories.map((category) => (
            <SideBarCategoryRow
              category={category}
              isChecked={!!checkedCategories[category.category]}
              onChange={() => handleCheckboxChange(category.category)}
              key={category.id}
            />
          ))}
        </menu>
      )}
    </div>
  );
}

export default SideBarCategories;
