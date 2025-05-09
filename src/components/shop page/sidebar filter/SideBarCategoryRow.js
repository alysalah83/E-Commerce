import { IoMdCheckmark } from "react-icons/io";

function SideBarCategoryRow({
  category: {
    id,
    category,
    products_count: [{ count }],
  },
  isChecked,
  onChange,
}) {
  return (
    <li className="group flex items-center justify-between gap-12">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <input
            id={id}
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            className="sr-only"
            aria-label={`category ${category}`}
          />
          <div
            onClick={onChange}
            className={`flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded border transition-colors ${isChecked ? "border-blue-600 bg-blue-600" : "border-gray-500 bg-white"}`}
          >
            <IoMdCheckmark
              className={`h-3 w-3 text-white ${isChecked ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>

        <label
          htmlFor={id}
          className={`cursor-pointer font-medium capitalize transition-colors group-hover:text-blue-600 ${isChecked ? "text-blue-600" : "text-gray-500"}`}
        >
          {category.replace("-", " ")}
        </label>
      </div>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full p-0.5 text-center text-xs font-bold transition-colors group-hover:bg-blue-600 group-hover:text-white ${isChecked ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
      >
        {count}
      </span>
    </li>
  );
}

export default SideBarCategoryRow;
