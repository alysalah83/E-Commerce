"use client";
import { useWhitelist } from "@/src/contexts/HybridStorageFactory";
import toast from "react-hot-toast";
import { GoHeart, GoHeartFill } from "react-icons/go";

function ButtonWhitelist({ id }) {
  const { handleActions, checkAddedItem } = useWhitelist();
  const isInWhitelist = checkAddedItem(id);
  const iconClass = "h-5 w-5 transition duration-300";

  return (
    <button
      aria-label="add to white list button"
      className={`group cursor-pointer rounded-md border border-gray-200 p-1 transition duration-300 ${isInWhitelist ? "text-red-500" : "text-gray-700"} hover:text-red-500`}
      onClick={() => {
        if (isInWhitelist) {
          handleActions({ action: "removeItem", productId: id });
          toast.success("Removed from whitelist");
          return;
        } else {
          handleActions({ action: "addItem", productId: id });
          toast.success("Added to whitelist");
        }
      }}
    >
      {isInWhitelist ? (
        <GoHeartFill className={`${iconClass} fill-red-500`} />
      ) : (
        <GoHeart className={iconClass} />
      )}
    </button>
  );
}

export default ButtonWhitelist;
