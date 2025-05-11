"use client";
import ButtonIcon from "./ButtonIcon";
import { IoEyeOutline } from "react-icons/io5";
import Button from "./Button";
import { useCart } from "@/src/contexts/HybridStorageFactory";
import ButtonWhitelist from "./ButtonWhitelist";
import toast from "react-hot-toast";
import { useState } from "react";
import ProductMiniPanel from "../product page/ProductMiniPanel";

function ProductFuturesBar({ product }) {
  const productId = product.id;
  const { checkAddedItem, handleActions } = useCart();
  const [showPanel, setShowPanel] = useState(false);
  const handleTogglePanel = () => setShowPanel((cur) => !cur);

  const isInCart = checkAddedItem(productId);

  return (
    <>
      {showPanel && (
        <ProductMiniPanel
          showPanel={showPanel}
          handleTogglePanel={handleTogglePanel}
          product={product}
        />
      )}
      <div className="absolute -bottom-20 left-1/2 z-10 flex w-full -translate-1/2 items-center justify-center gap-2 transition duration-400 group-hover:-translate-y-25">
        <ButtonIcon onClick={handleTogglePanel}>
          <IoEyeOutline />
        </ButtonIcon>
        <Button
          size="small"
          onClick={(e) => {
            if (!isInCart) {
              e.stopPropagation();
              handleActions({ action: "addItem", productId });
              toast.success("Added to Cart");
            }
          }}
          color={isInCart ? "bg-blue-900" : "bg-blue-600"}
          hoverColor={isInCart ? "hover:bg-blue-950" : "hover:bg-blue-700"}
        >
          {isInCart ? "check out" : "add to cart"}
        </Button>
        <ButtonWhitelist id={productId} />
      </div>
    </>
  );
}

export default ProductFuturesBar;
