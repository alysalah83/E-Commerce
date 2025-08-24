"use client";

import Loader from "../common/Loader";
import CartOrderSummery from "./CartOrderSummery";
import EmptyPage from "../common/EmptyPage";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Table from "../common/table/Table";
import { useCart } from "@/src/hooks/useCart";

function Cart() {
  const {
    products,
    isLoading,
    totalItems,
    totalPrice,
    handleActions,
    getItemCount,
  } = useCart();

  if (isLoading) return <Loader />;

  return (
    <main className={`${totalItems > 0 ? "bg-gray-100" : "bg-white"}`}>
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {totalItems > 0 ? (
          <>
            <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
              <Table
                items={products}
                handleActions={handleActions}
                getItemCount={getItemCount}
                withCount={true}
              />
            </div>
            <CartOrderSummery
              items={products}
              itemsBalance={totalPrice}
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
