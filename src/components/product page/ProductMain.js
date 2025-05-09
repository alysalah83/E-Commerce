import ProductDetails from "@/src/components/product page/ProductDetails";
import { getProductById } from "@/src/lib/data-service";
import { unstable_cache } from "next/cache";

export const productCached = unstable_cache(
  async (id) => getProductById(id),
  ["product"],
  {
    revalidate: 3600,
    tags: ["product"],
  },
);

async function ProductMain({ productId }) {
  const product = await productCached(productId);
  return <ProductDetails product={product} />;
}

export default ProductMain;
