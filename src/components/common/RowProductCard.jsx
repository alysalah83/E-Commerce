import Image from "next/image";

import RateStars from "./RateStars";
import Link from "next/link";
import ProductFuturesBar from "./ProductFuturesBar";

function RowProductCard({ product }) {
  const { image, title, price, discountPercentage, rating, id } = product;

  return (
    <div className="group flex h-fit w-full rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="border-r border-gray-300 p-4">
        <div className="relative h-64 w-64 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg">
          <div className="relative h-full w-full">
            <Link href={`/shop/${id}`}>
              <Image
                src={image}
                alt={`${title} image`}
                fill
                className="object-contain p-2"
                sizes="250px"
              />
            </Link>
          </div>
          <ProductFuturesBar product={product} />
        </div>
      </div>

      <div className="ml-6 flex flex-col justify-between p-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold tracking-wide transition-colors duration-300 hover:cursor-pointer hover:text-blue-700">
            <Link href={`/shop/${id}`}>{title}</Link>
          </h3>

          <div className="mb-2">
            <RateStars rating={rating} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-950">${price}</span>
          <span className="text-base text-gray-400 line-through">
            ${Math.round(price + price * (discountPercentage / 100))}
          </span>
          <span className="ml-2 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            {Math.round(discountPercentage)}% OFF
          </span>
        </div>
      </div>
    </div>
  );
}

export default RowProductCard;
