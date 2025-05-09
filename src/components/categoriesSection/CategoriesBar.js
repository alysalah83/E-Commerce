"use client";

import { usePosition } from "@/src/contexts/CategoriesSliderProvider";
import Category from "./Category";

function CategoriesBar({ categories }) {
  const { sliderRef } = usePosition();

  return (
    <div className="scrollbar-hide flex gap-6 overflow-scroll" ref={sliderRef}>
      {categories.map((category) => (
        <Category category={category} key={category.id} />
      ))}
    </div>
  );
}

export default CategoriesBar;
