import Image from "next/image";
import { useState } from "react";
import ButtonDelete from "@/src/components/common/ButtonDelete";
import Link from "next/link";
import ProductPurchaseCount from "@/src/components/product page/ProductPurchaseCount";

function TableRowWithCount({
  tableRowClass,
  item,
  removeFromLocal,
  updateCount,
  getItemCount,
}) {
  const { id, image, title, price, stock } = item;
  const initialCount = getItemCount(id);
  const [count, setCount] = useState(initialCount || 1);
  const subtotalPrice = price * count;
  const priceClasses = "self-center font-semibold tracking-wide text-lg";

  const handleCountChange = function (newCount) {
    setCount(newCount);
    updateCount(id, newCount);
  };

  return (
    <div className={`${tableRowClass} text-gray-600 last:border-0`}>
      <div className="flex items-center gap-5">
        <div className="h-24 w-24 rounded-md bg-gray-100">
          <div className="relative h-full w-full">
            <Image
              src={image}
              fill
              alt={`${title} image`}
              className="object-contain"
            />
          </div>
        </div>
        <span className="pr-2 text-lg font-medium text-wrap transition duration-300 hover:text-blue-600 lg:font-bold">
          <Link href={`/shop/${id}`}>{title}</Link>
        </span>
      </div>
      <div className={priceClasses}>${price}</div>
      <div className="flex items-center">
        <ProductPurchaseCount
          initialCount={count}
          stock={stock}
          setOutSideCount={handleCountChange}
        />
      </div>
      <div className={priceClasses}>${subtotalPrice}</div>
      <div className="self-center">
        <ButtonDelete onRemove={() => removeFromLocal(id)} />
      </div>
    </div>
  );
}

export default TableRowWithCount;
