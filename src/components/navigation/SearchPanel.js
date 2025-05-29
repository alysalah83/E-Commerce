"use client";

import { CiSearch } from "react-icons/ci";
import OverLay from "../common/OverLay";
import { useState } from "react";
import { useSearchItems } from "@/src/hooks/useSearchItems";
import Loader from "../common/Loader";
import { IoMdClose } from "react-icons/io";
import ProductItem from "../common/ProductItem";

function SearchPanel({ handleToggleVisibility, visible }) {
  const [searchQuery, setSearchQuery] = useState("");
  const formattedQuery = searchQuery.trim();

  const { items, isPending, error } = useSearchItems(formattedQuery);

  return (
    <>
      <OverLay
        visible={visible}
        handleToggleVisibility={handleToggleVisibility}
        color="bg-black/20"
      />
      <div className="fixed top-1/2 left-1/2 z-50 mx-auto h-11/12 min-w-11/12 -translate-1/2 overflow-y-auto rounded-xl bg-white px-6 py-8 shadow-lg md:px-8 lg:p-16 xl:min-w-7xl">
        <span
          onClick={handleToggleVisibility}
          className="fixed top-4 right-4 z-50 cursor-pointer rounded-full bg-gray-100 p-1"
        >
          <IoMdClose className="h-7 w-7 text-gray-600" />
        </span>
        <div className="relative mb-10">
          <input
            className="w-full rounded-lg border border-gray-300 px-10 py-3 text-lg text-gray-600 outline-0 transition duration-300 focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type anything to search..."
          />
          <button className="absolute top-1/2 left-2 -translate-y-1/2 outline-0">
            <CiSearch className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <ul className="flex w-full flex-col gap-6">
            {items && items.length > 0 ? (
              items.map((item) => (
                <ProductItem
                  item={item}
                  searchQuery={searchQuery}
                  key={item.id}
                />
              ))
            ) : (
              <h3 className="mx-auto mt-20 text-4xl font-bold tracking-wide text-blue-950">
                No items to display
              </h3>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default SearchPanel;
