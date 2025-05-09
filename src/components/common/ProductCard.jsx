import Image from "next/image";
import RateStars from "./RateStars";
import Link from "next/link";
import ProductFuturesBar from "./ProductFuturesBar";

function ProductCard({ product }) {
  const { image, title, price, discountPercentage, rating, id } = product;

  return (
    <div className="group">
      <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg bg-gray-100 hover:cursor-pointer">
        <div className="relative h-full w-full">
          <Link href={`/shop/${id}`}>
            <Image
              src={image}
              alt={`${title} image`}
              fill
              className="object-contain p-2"
              sizes="260px"
            />
          </Link>
        </div>
        <ProductFuturesBar product={product} />
      </div>
      <RateStars rating={rating} />
      <h3 className="mb-3 text-lg font-semibold tracking-wide transition-colors duration-300 hover:cursor-pointer hover:text-blue-700">
        <Link href={`/shop/${id}`}>{title}</Link>
      </h3>
      <span className="flex gap-3 text-lg font-bold">
        <span>${price}</span>
        <span className="font-normal tracking-wide text-gray-400 line-through">
          ${Math.round(price + price * (discountPercentage / 100))}
        </span>
      </span>
    </div>
  );
}

export default ProductCard;
