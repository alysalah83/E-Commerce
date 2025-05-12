"use client";

import { CiSearch } from "react-icons/ci";
import OverLay from "../common/OverLay";
import Image from "next/image";
import RateStars from "../common/RateStars";
import { useState } from "react";
import { useSearchItems } from "@/src/hooks/useSearchItems";
import Loader from "../common/Loader";
import Link from "next/link";
import { TiEdit } from "react-icons/ti";
import { notFound } from "next/navigation";
import { IoMdClose } from "react-icons/io";

function SearchPanel({ handleToggleVisibility, visible }) {
  const [searchQuery, setSearchQuery] = useState("");
  const formattedQuery = searchQuery.trim();

  const { items, isPending, error } = useSearchItems(formattedQuery);

  if (error) notFound();

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
                <SearchItem
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

function SearchItem({ item, searchQuery }) {
  const { id, image, title, price, rating } = item;

  return (
    <Link href={`/shop/${id}`} className="w-full">
      <li className="flex items-center gap-4 rounded-xl py-4 transition duration-300 hover:bg-gray-200 md:px-4">
        <div className="h-26 w-26 rounded-xl bg-gray-100 lg:h-32 lg:w-32 xl:h-40 xl:w-40">
          <div className="relative h-full w-full">
            <Image
              fill
              src={image}
              alt={`${title} image`}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 py-6 sm:px-6">
          <h4
            className={`cursor-pointer text-lg font-semibold transition duration-300 hover:text-blue-600 lg:text-2xl`}
          >
            <HighlightedText title={title} query={searchQuery} />
          </h4>
          <div className="flex gap-1 lg:gap-3">
            <span className="text-lg font-medium text-gray-500 lg:text-xl">
              ${price}
            </span>
            <span className="text-lg font-medium text-gray-300">|</span>
            <RateStars size={20} rating={rating} />
          </div>
        </div>
      </li>
    </Link>
  );
}

function HighlightedText({ title, query }) {
  if (!title || !query) return title;
  const lowerTitle = title.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const indexOfQuery = lowerTitle.indexOf(lowerQuery);

  if (indexOfQuery === -1) return title;

  const before = title.slice(0, indexOfQuery);
  const highlightQuery = title.slice(indexOfQuery, indexOfQuery + query.length);
  const after = title.slice(indexOfQuery + query.length);

  return (
    <>
      {before}
      <span className="bg-yellow-300">{highlightQuery}</span>
      {after}
    </>
  );
}

export default SearchPanel;
