import Image from "next/image";
import RateStars from "../common/RateStars";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import ButtonDelete from "./ButtonDelete";
import { deleteProduct } from "@/src/lib/actions";

function ProductItem({
  item,
  searchQuery,
  highlightQuery = true,
  manageProduct = false,
}) {
  const { id, image, title, price, rating, brand } = item;

  return (
    <div className="flex items-center overflow-auto">
      <Link
        href={`/shop/${id}`}
        className={`w-full ${manageProduct ? "pr-2" : ""}`}
      >
        <li className="flex min-w-0 items-center gap-4 rounded-xl py-4 transition duration-300 hover:bg-gray-200 md:px-4">
          <div className="h-26 min-h-26 w-26 min-w-26 flex-shrink-0 rounded-xl bg-gray-100 lg:h-32 lg:w-32 xl:h-40 xl:w-40">
            <div className="relative h-full w-full">
              <Image
                fill
                src={image}
                alt={`${title} image`}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2 py-6 sm:px-6">
            <h4 className="cursor-pointer text-lg font-semibold transition duration-300 hover:text-blue-600 lg:text-2xl">
              {highlightQuery ? (
                <HighlightedText title={title} query={searchQuery} />
              ) : (
                title
              )}
            </h4>
            <div className="flex flex-wrap items-center gap-1 lg:gap-3">
              <span className="text-lg font-medium text-gray-500 lg:text-xl">
                ${price}
              </span>
              <span className="text-lg font-medium text-gray-300">|</span>
              <h5 className="text-lg font-medium text-gray-500 lg:text-xl">
                {brand}
              </h5>
              <span className="text-lg font-medium text-gray-300">|</span>
              <div className="flex-shrink-0">
                <RateStars size={20} rating={rating} />
              </div>
            </div>
          </div>
        </li>
      </Link>
      {manageProduct && (
        <div className="flex h-full w-fit flex-shrink-0 flex-col gap-3 p-4">
          <ButtonDelete onRemove={deleteProduct.bind(null, id)} />
          <ButtonEdit />
        </div>
      )}
    </div>
  );
}

function HighlightedText({ title, query }) {
  if (!title || !query) return title;

  const lowerTitle = title.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const indexOfQuery = lowerTitle.indexOf(lowerQuery);

  if (indexOfQuery === -1) return title;

  const before = title.slice(0, indexOfQuery);
  const highlightQuery = title.slice(indexOfQuery, indexOfQuery + query.length);
  const after = title.slice(indexOfQuery + query.length);

  return (
    <>
      {before}
      <span className="bg-yellow-300">{highlightQuery}</span>
      {after}
    </>
  );
}

function ButtonEdit({ onEdit }) {
  return (
    <button
      onClick={onEdit}
      className="group h-fit cursor-pointer self-center rounded-md border border-gray-300 p-2 text-gray-400 transition duration-300 hover:border-blue-600 hover:bg-blue-600/20"
      aria-label="Edit product"
    >
      <FaRegEdit className="h-5 w-5 transition duration-300 group-hover:text-blue-600/70" />
    </button>
  );
}

export default ProductItem;
