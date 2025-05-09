"use client";

import { useState } from "react";

function ProductPurchaseCount({ stock, setOutSideCount, initialCount }) {
  const [count, setCount] = useState(initialCount);

  const handleIncreaseCount = () => {
    if (count >= stock) return;
    const newCount = count === stock ? count : count + 1;
    setCount(newCount);
    setOutSideCount(newCount);
  };
  const handleDecreaseCount = () => {
    if (count <= 1) return;
    const newCount = count - 1;
    setCount(newCount);
    setOutSideCount(newCount);
  };

  return (
    <div className="flex w-fit items-center rounded-md border border-gray-200">
      <span
        onClick={handleDecreaseCount}
        className="cursor-pointer border-r border-gray-200 px-4 py-1 text-3xl font-semibold text-gray-500 transition duration-300 select-none hover:text-blue-500 lg:py-2"
      >
        -
      </span>
      <span className="px-4 py-1 text-xl font-semibold text-gray-500 lg:py-2">
        {count}
      </span>
      <span
        onClick={handleIncreaseCount}
        className="cursor-pointer border-l border-gray-200 px-4 py-1 text-3xl font-semibold text-gray-500 transition duration-300 select-none hover:text-blue-500 lg:py-2"
      >
        +
      </span>
    </div>
  );
}

export default ProductPurchaseCount;
