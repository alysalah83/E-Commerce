import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function ToggleMenu({ label, toggle, onClick }) {
  return (
    <h3
      className={`flex items-center justify-between ${toggle ? "border-b border-gray-300" : ""} p-5 py-3 hover:cursor-pointer`}
      onClick={onClick}
    >
      <span className="text-lg font-semibold">{label}</span>
      <span>
        {toggle ? (
          <IoIosArrowDown className="h-5 w-5" />
        ) : (
          <IoIosArrowUp className="h-5 w-5" />
        )}
      </span>
    </h3>
  );
}

export default ToggleMenu;
