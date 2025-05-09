import Image from "next/image";
import RateStars from "../common/RateStars";
import Link from "next/link";
import ProductFuturesBar from "../common/ProductFuturesBar";

function ReverseProductCard({ product }) {
  const { image, title, price, discountPercentage, rating, id } = product;

  return (
    <div className="group rounded-lg bg-gray-100 p-5 lg:p-6">
      <RateStars rating={rating} />
      <h3 className="mb-2 text-lg font-semibold tracking-wide transition-colors duration-300 hover:cursor-pointer hover:text-blue-700">
        <Link href={`/shop/${id}`}>{title}</Link>
      </h3>
      <span className="flex gap-3 text-lg font-bold">
        <span>${price}</span>
        <span className="text-gray-300 line-through">
          ${Math.round(price + price * (discountPercentage / 100))}
        </span>
      </span>
      <div className="relative mb-6 h-64 w-full overflow-hidden hover:cursor-pointer">
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
    </div>
  );
}

export default ReverseProductCard;
