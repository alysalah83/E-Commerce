"use client";

import Loader from "../common/Loader";
import CartSideBarItem from "./CartSideBarItem";
import EmptyPage from "../common/EmptyPage";
import { AiOutlineShoppingCart } from "react-icons/ai";

function CartContent({
  items,
  isLoading,
  totalItems,
  handleActions,
  getItemCount,
}) {
  if (isLoading) return <Loader />;

  return totalItems ? (
    <ul className="flex flex-col gap-6 overflow-auto lg:gap-8">
      {items?.map((item) => (
        <CartSideBarItem
          item={item}
          handleActions={handleActions}
          getItemCount={getItemCount}
          key={item.id}
        />
      ))}
    </ul>
  ) : (
    <EmptyPage
      label="your cart is empty!"
      Icon={<AiOutlineShoppingCart className="h-10 w-10 text-gray-400" />}
    />
  );
}

export default CartContent;
