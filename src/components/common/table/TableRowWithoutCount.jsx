import Image from "next/image";
import ButtonDelete from "@/src/components/common/ButtonDelete";
import Link from "next/link";
import StockLabel from "../StockLabel";
import ButtonAddToCart from "../ButtonAddToCar";

function TableRowWithoutCount({ item, tableRowClass, removeFromLocal }) {
  const { id, image, title, price, stock } = item;
  const priceClasses = "self-center font-semibold tracking-wide text-lg";

  return (
    <div className={`${tableRowClass} text-gray-600 last:border-0`}>
      <div className="self-center">
        <ButtonDelete icon="remove" onRemove={() => removeFromLocal(id)} />
      </div>
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
        <StockLabel stock={stock} />
      </div>
      <div className={priceClasses}>
        <ButtonAddToCart id={id} />
      </div>
    </div>
  );
}

export default TableRowWithoutCount;
