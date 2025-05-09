import Image from "next/image";
import Button from "../common/Button";
import Link from "next/link";

function OfferCard({
  product: { image, title, discountPercentage, description, id },
  type,
  bgColor,
  buttonColor,
  buttonHoverColor,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${
        typeof bgColor === "object"
          ? `bg-gradient-to-br ${bgColor.from} ${bgColor.to}`
          : bgColor
      } p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl ${
        type === "primary" ? "lg:col-span-2" : ""
      } lg:p-12`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative z-10 w-full sm:w-3/5 lg:w-2/3">
          <span className="mb-2 inline-block text-xl font-semibold">
            {title}
          </span>
          <h2 className="mb-4 text-2xl font-bold tracking-wide uppercase">
            up to {Math.round(discountPercentage)}% offer
          </h2>
          <p className="mb-6 text-gray-600 lg:text-lg">{description}</p>
          <Link href={`/shop/${id}`}>
            <Button color={buttonColor} hoverColor={buttonHoverColor}>
              Buy Now
            </Button>
          </Link>
        </div>
        <div className="mt-6 flex justify-center sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 sm:w-2/5 sm:justify-end lg:w-1/3">
          <div className="relative h-[250px] w-[250px] lg:h-[350px] lg:w-[350px]">
            <Image
              src={image}
              fill
              alt={`${title} image`}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;
