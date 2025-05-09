import { getHightestRatedProducts } from "@/src/lib/data-service";
import ReverseProductCard from "./ReverseProductCard";

async function BestSellersCards() {
  const products = await getHightestRatedProducts({ allProducts: false });
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ReverseProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default BestSellersCards;
