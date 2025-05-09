import HeroProductCard from "./HeroProductCard";

function DiscountsCard({ products }) {
  return products.map((product) => (
    <HeroProductCard product={product} key={product.id} />
  ));
}

export default DiscountsCard;
