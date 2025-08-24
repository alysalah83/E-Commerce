"use client";

import { useCart } from "@/src/hooks/useCart";
import { togglePanel } from "@/src/store/cartSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";

function CartNavButton() {
  const dispatch = useDispatch();
  const { totalPrice, totalItems } = useCart();

  return (
    <>
      <button
        className="relative flex cursor-pointer items-center gap-2"
        onClick={() => dispatch(togglePanel())}
      >
        <span className="absolute -top-2 -left-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-blue-50">
          {totalItems}
        </span>
        <AiOutlineShoppingCart className="h-6 w-6 fill-blue-700" />
        <div className="flex flex-col items-center justify-between">
          <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase">
            cart
          </h4>
          <p className="text-sm font-semibold capitalize">${totalPrice}</p>
        </div>
      </button>
    </>
  );
}

export default CartNavButton;
