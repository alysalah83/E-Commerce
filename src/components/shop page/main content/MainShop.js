"use client";

import MainHeader from "./MainHeader";
import Pagination from "../../common/Pagination";
import ProductItems from "./ProductItems";
import Loader from "../../common/Loader";
import { useProducts } from "@/src/contexts/ProductsProvider";
import { PAGINATION_ITEMS_PER_PAGE } from "@/src/lib/config";

function MainShop() {
  const {
    products,
    productsCount,
    isProductsPending,
    isLayoutGrid,
    handleLayoutToggle,
    handleToggleDate,
    productsCountPerPage,
    filterDate,
  } = useProducts();

  if (isProductsPending) return <Loader />;

  return (
    <main className="w-full">
      <MainHeader
        productsCount={productsCount}
        productsCountPerPage={productsCountPerPage}
        isLayoutGrid={isLayoutGrid}
        onLayoutToggle={handleLayoutToggle}
        onFilterDateToggle={handleToggleDate}
        filterDate={filterDate}
      />
      <ProductItems products={products} isLayoutGrid={isLayoutGrid} />
      <Pagination
        totalItems={productsCount}
        itemsPerPage={PAGINATION_ITEMS_PER_PAGE}
      />
    </main>
  );
}

export default MainShop;
