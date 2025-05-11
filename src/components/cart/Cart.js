"use client";

import Loader from "../common/Loader";
import CartOrderSummery from "./CartOrderSummery";
import { useCart } from "@/src/contexts/HybridStorageFactory";
import EmptyPage from "../common/EmptyPage";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Table from "../common/table/Table";

function Cart() {
  const {
    items,
    isPending,
    itemsCount,
    itemsBalance,
    getItemCount,
    handleActions,
  } = useCart();

  if (isPending) return <Loader />;

  return (
    <main className={`${itemsCount > 0 ? "bg-gray-100" : "bg-white"}`}>
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {itemsCount > 0 ? (
          <>
            <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
              <Table
                items={items}
                handleActions={handleActions}
                getItemCount={getItemCount}
                withCount={true}
              />
            </div>
            <CartOrderSummery
              items={items}
              itemsBalance={itemsBalance}
              getItemCount={getItemCount}
            />
          </>
        ) : (
          <div className="flex w-full justify-center">
            <EmptyPage
              label="your cart is empty!"
              Icon={
                <AiOutlineShoppingCart className="h-10 w-10 text-gray-400" />
              }
              buttonLargePadding={true}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
