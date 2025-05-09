import Image from "next/image";
import RateStars from "../common/RateStars";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import ProductFuturesButtons from "./ProductFuturesButtons";
import StockLabel from "../common/StockLabel";
import ProductImageWindow from "./ProductImageWindow";

function ProductDetails({ product }) {
  const {
    id,
    image,
    title,
    discountPercentage,
    reviews,
    stock,
    rating,
    price,
  } = product;
  const discount = Math.round(discountPercentage);
  const reviewsCount = reviews.length;
  const priceBeforeDiscount = Math.round(price + price / discountPercentage);
  const haveFreeShipping = price > 250;

  return (
    <div className="gap mt-6 flex flex-col gap-10 lg:flex-row">
      <div className="relative flex h-90 w-full justify-center rounded-xl bg-gray-100 py-10 lg:h-[500px]">
        <div className="relative h-full w-80">
          <Image
            src={image}
            fill
            alt={`${title} image`}
            sizes="500px"
            className="object-contain"
          />
        </div>
        <ProductImageWindow image={image} title={title} />
      </div>
      <div className="sm:p-4 lg:min-w-1/2 lg:py-8">
        <div className="mb-8 border-b border-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold sm:text-2xl lg:text-2xl xl:text-3xl">
              {title}
            </h3>
            <span className="rounded-sm bg-blue-600 px-2 py-1 text-sm font-bold tracking-wide text-blue-50">
              {discount}% Off
            </span>
          </div>
          <div className="mb-5 flex items-center">
            <RateStars showLabel={false} rating={rating} />
            <span className="ml-1.5 font-medium text-gray-400">
              ( {reviewsCount} reviews )
            </span>
            <StockLabel stock={stock} />
          </div>
          <div className="mb-6 flex gap-2 text-xl font-bold">
            <span>Price: ${price}</span>
            <span className="text-gray-400 line-through">
              ${priceBeforeDiscount}
            </span>
          </div>
          <ul className="mb-7 flex flex-col gap-2 text-lg font-medium">
            {haveFreeShipping && (
              <li className="flex items-center gap-2 text-blue-500">
                <IoCheckmarkCircleOutline className="h-5 w-5" />
                <span>Free shipping available</span>
              </li>
            )}
            <li className="flex items-center gap-2 text-blue-500">
              <IoCheckmarkCircleOutline className="h-5 w-5" />
              <span>Sales {discount}% Off</span>
            </li>
          </ul>
        </div>
        <ProductFuturesButtons productId={id} stock={stock} />
      </div>
    </div>
  );
}

export default ProductDetails;
