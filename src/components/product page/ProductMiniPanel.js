"use client";

import OverLay from "../common/OverLay";
import { IoMdClose } from "react-icons/io";
import ProductDetails from "./ProductDetails";

function ProductMiniPanel({ showPanel, handleTogglePanel, product }) {
  return (
    <>
      <OverLay
        visible={showPanel}
        handleToggleVisibility={handleTogglePanel}
        color="bg-blue-950/80"
      />

      <div className="fixed top-1/2 left-1/2 z-50 -translate-1/2 rounded-lg bg-white px-8 py-8 lg:min-w-11/12 lg:px-16 xl:min-w-2/3">
        <div className="relative">
          <ProductDetails product={product} />
          <div
            onClick={handleTogglePanel}
            className="fixed top-4 right-4 cursor-pointer rounded-full bg-gray-100 p-2"
          >
            <IoMdClose className="h-7 w-7 text-blue-900" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductMiniPanel;
