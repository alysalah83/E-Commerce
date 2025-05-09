import { useCart } from "@/src/contexts/HybridStorageFactory";
import Button from "./Button";
import toast from "react-hot-toast";

function ButtonAddToCart({ id, count = 1 }) {
  const { addToLocal, checkAddedItem } = useCart();
  const isInCart = checkAddedItem(id);

  return (
    <Button
      onClick={() => {
        if (!isInCart) addToLocal(id, count);
        toast.success("Added to cart");
      }}
      color={isInCart ? "bg-gray-700" : "bg-blue-800"}
      disabled={isInCart}
      hoverColor={isInCart ? "" : "hover:bg-blue-700"}
    >
      {isInCart ? "added" : "add to cart"}
    </Button>
  );
}

export default ButtonAddToCart;
