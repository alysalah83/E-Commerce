"use client";

import Button from "../common/Button";
import ProductPurchaseCount from "./ProductPurchaseCount";
import { useState } from "react";
import { useCart } from "@/src/contexts/HybridStorageFactory";
import ButtonAddToCart from "../common/ButtonAddToCar";
import ButtonWhitelist from "../common/ButtonWhitelist";

function ProductFuturesButtons({ productId, stock }) {
  const { getItemCount } = useCart();
  const initialCount = getItemCount(productId);
  const [count, setCount] = useState(initialCount || 1);

  return (
    <div>
      <div className="mb-6 flex items-center gap-7">
        <ButtonAddToCart id={productId} count={count} />
        <ButtonWhitelist id={productId} />
      </div>
      <div className="flex items-center gap-6">
        <ProductPurchaseCount
          initialCount={count}
          stock={stock}
          setOutSideCount={setCount}
        />
        <Button scratch={false}>purchase now</Button>
      </div>
    </div>
  );
}

export default ProductFuturesButtons;
