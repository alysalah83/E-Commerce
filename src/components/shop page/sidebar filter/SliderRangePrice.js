import { useFilters } from "@/src/contexts/FiltersProvider";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function SliderRangePrice() {
  const { min, max, setPriceRange, initMin, initMax } = useFilters();

  return (
    <div className="flex flex-col gap-4 px-6 pt-12 pb-8">
      <style>
        {`
         .range-slider__thumb[data-lower]::before {
            content: "${min}";
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.875rem;
            color: #6a7282;
            font-wight: 600;
            }

         .range-slider__thumb[data-upper]::before {
            content: "${max}";
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.875rem;
            color: #6a7282;
            font-wight: 600;
            }
        `}
      </style>
      <RangeSlider
        min={initMin}
        max={initMax}
        value={[min, max]}
        onInput={([min, max]) => setPriceRange({ min, max })}
      />
      <div className="flex items-center justify-between text-gray-500">
        <div className="rounded-md border border-gray-300">
          <span className="inline-block p-2 text-sm leading-1">$</span>
          <span className="inline-block border-l border-gray-300 p-2 text-sm font-semibold">
            {min}
          </span>
        </div>
        <div className="rounded-md border border-gray-300">
          <span className="inline-block p-2 text-sm leading-1">$</span>
          <span className="inline-block border-l border-gray-300 p-2 text-sm font-semibold">
            {max}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SliderRangePrice;
