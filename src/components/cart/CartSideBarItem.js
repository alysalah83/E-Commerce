import { useCart } from "@/src/contexts/HybridStorageFactory";
import Image from "next/image";
import Link from "next/link";
import ButtonDelete from "../common/ButtonDelete";

function CartSideBarItem({ item }) {
  const { id, image, title, price } = item;
  const { removeFromLocal, getItemCount } = useCart();

  const count = getItemCount(id);

  return (
    <li className="flex gap-2">
      <div className="h-24 w-24 rounded-lg bg-gray-100 lg:h-28 lg:w-28">
        <div className="relative h-full w-full">
          <Image
            src={image}
            fill
            alt={`${title} image`}
            sizes="(max-width: 768px) 96px, 112px"
            className="object-contain p-2"
          />
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-3 p-3">
        <h4 className="text-warp text-sm font-bold text-gray-500 md:text-base lg:text-lg">
          <Link href={`/shop/${id}`}>
            {title} {count !== 1 && count && <span>( {count} )</span>}
          </Link>
        </h4>
        <span className="font-semibold tracking-wide text-gray-600 lg:font-bold">
          ${price}
        </span>
      </div>
      <ButtonDelete onRemove={() => removeFromLocal(id)} />
    </li>
  );
}

export default CartSideBarItem;
