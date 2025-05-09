import { IoCloseCircleOutline } from "react-icons/io5";
import ButtonLink from "../common/ButtonLink";
import CartContent from "./CartContent";
import { useCart } from "@/src/contexts/HybridStorageFactory";

function CartSideBar({ visible, handleToggleCart }) {
  const { itemsBalance } = useCart();

  return (
    <div
      className={`fixed right-0 bottom-0 z-40 flex h-screen max-w-[85%] flex-col transition-all duration-500 ${visible ? "translate-x-0" : "translate-x-full"} min-w-3xs bg-white p-4 lg:min-w-96 lg:p-8 xl:min-w-lg`}
    >
      <div className="mb-12 flex items-center justify-between border-b border-gray-200 pb-5">
        <h2 className="text-xl font-bold tracking-wide capitalize lg:text-2xl lg:font-semibold">
          cart view
        </h2>
        <IoCloseCircleOutline
          onClick={handleToggleCart}
          className="h-7 w-7 cursor-pointer text-gray-500 transition duration-300 hover:text-gray-700"
        />
      </div>
      <CartContent />
      <div className="mt-auto flex flex-col gap-5 border-t border-gray-200 pt-5">
        <div className="flex items-center justify-between text-lg font-semibold tracking-wide lg:text-xl">
          <span>Subtotal :</span>
          <span>${itemsBalance}</span>
        </div>
        <div className="flex justify-between gap-3">
          <ButtonLink href="/cart" onClick={handleToggleCart}>
            view cart
          </ButtonLink>
          <ButtonLink color="bg-blue-900" hoverColor="hover:bg-blue-950">
            check out
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default CartSideBar;
