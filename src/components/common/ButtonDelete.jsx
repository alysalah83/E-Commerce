"use client";

import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { IoIosRemoveCircleOutline } from "react-icons/io";

function ButtonDelete({ icon = "trash", onRemove }) {
  const iconClasses =
    "h-5 w-5 transition duration-300 group-hover:text-red-600/70";
  const icons = {
    trash: <GoTrash className={iconClasses} />,
    remove: <IoIosRemoveCircleOutline className={iconClasses} />,
  };
  return (
    <button
      className="group h-fit cursor-pointer self-center rounded-md border border-gray-300 p-2 text-gray-400 transition duration-300 hover:border-red-600 hover:bg-red-600/20"
      onClick={() => {
        onRemove();
        toast.success("Product has been removed");
      }}
    >
      {icons[icon]}
    </button>
  );
}

export default ButtonDelete;
