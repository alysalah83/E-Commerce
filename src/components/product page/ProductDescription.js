import { productCached } from "./ProductMain";
import SwitchTaps from "./SwitchTaps";

async function ProductDescription({ productId }) {
  const product = await productCached(productId);

  return <SwitchTaps product={product} />;
}

export default ProductDescription;
