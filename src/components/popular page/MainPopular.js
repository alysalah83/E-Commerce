"use client";
import MainHeader from "@/src/components/shop page/main content/MainHeader";
import ProductItems from "@/src/components/shop page/main content/ProductItems";
import {
  PAGINATION_DELTA,
  PAGINATION_POPULAR_ITEMS_PER_PAGE,
} from "@/src/lib/config";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Pagination from "../common/Pagination";

function MainPopular({ products, productsCount }) {
  const searchParams = useSearchParams();
  const [isLayoutGrid, setIsLayoutGrid] = useState(true);

  const itemsPerPage = PAGINATION_POPULAR_ITEMS_PER_PAGE;

  const handleLayoutToggle = () => setIsLayoutGrid((cur) => !cur);

  const page = Number(searchParams.get("page")) || 1;

  const productsCountPerPage =
    Math.ceil(productsCount / itemsPerPage) === page
      ? (productsCount % itemsPerPage) + (page - 1) * itemsPerPage
      : page * itemsPerPage;

  console.log(products, productsCount, productsCountPerPage);
  return (
    <>
      <MainHeader
        productsCount={productsCount}
        productsCountPerPage={productsCountPerPage}
        isLayoutGrid={isLayoutGrid}
        onLayoutToggle={handleLayoutToggle}
        haveFilter={false}
      />
      <ProductItems
        bigLayout={true}
        products={products}
        isLayoutGrid={isLayoutGrid}
      />
      <Pagination
        totalItems={productsCount}
        itemsPerPage={PAGINATION_POPULAR_ITEMS_PER_PAGE}
        delta={PAGINATION_DELTA}
      />
    </>
  );
}

export default MainPopular;
