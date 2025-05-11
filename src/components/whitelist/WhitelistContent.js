"use client";

import Loader from "../common/Loader";
import { useWhitelist } from "@/src/contexts/HybridStorageFactory";
import EmptyPage from "../common/EmptyPage";
import { LuFolderHeart } from "react-icons/lu";
import Table from "../common/table/Table";

function Cart() {
  const { items, itemsCount, isPending, handleActions } = useWhitelist();

  if (isPending) return <Loader />;

  return (
    <main className={`${itemsCount > 0 ? "bg-gray-100" : "bg-white"}`}>
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {itemsCount > 0 ? (
          <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
            <Table items={items} handleActions={handleActions} />
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <EmptyPage
              label="your WhiteList is empty!"
              Icon={<LuFolderHeart className="h-10 w-10 text-gray-400" />}
              buttonLargePadding={true}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
