import { FaRegCircleXmark } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

function StockLabel({ stock }) {
  const inStock = stock > 0;

  const StockIcon = inStock ? IoCheckmarkCircleOutline : FaRegCircleXmark;

  return (
    <span
      className={`flex items-center gap-1.5 font-medium ${inStock ? "text-emerald-500" : "text-red-500"} ml-5`}
    >
      <StockIcon className="h-5 w-5" />
      {inStock ? "in Stock" : "out of Stock"}
    </span>
  );
}

export default StockLabel;
