"use client";

import Loader from "../common/Loader";
import CartSideBarItem from "./CartSideBarItem";
import { useCart } from "@/src/contexts/HybridStorageFactory";
import EmptyPage from "../common/EmptyPage";
import { AiOutlineShoppingCart } from "react-icons/ai";

function CartContent() {
  const { items, isPending, itemsCount } = useCart();

  if (isPending) return <Loader />;

  return itemsCount ? (
    <ul className="flex flex-col gap-6 overflow-auto lg:gap-8">
      {items.map((item) => (
        <CartSideBarItem item={item} key={item.id} />
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
