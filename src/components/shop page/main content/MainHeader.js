import { GoRows } from "react-icons/go";
import { LuLayoutGrid } from "react-icons/lu";

function MainHeader({
  productsCount,
  isLayoutGrid,
  onLayoutToggle,
  onFilterDateToggle,
  productsCountPerPage,
  filterDate,
  haveFilter = true,
}) {
  const layoutButtons = [{ layout: "grid" }, { layout: "row" }];
  const selectFilterOptions = haveFilter
    ? [
        {
          value: "latestProducts",
          label: "Latest Products",
        },
        {
          value: "oldestProducts",
          label: "Oldest products",
        },
      ]
    : null;

  return (
    <div
      className={`mb-9 flex justify-between rounded-md bg-white ${haveFilter ? "p-4" : "px-8 py-4"} shadow-sm`}
    >
      <div className="flex flex-wrap items-center gap-2 lg:gap-4.5">
        {haveFilter && (
          <select
            value={filterDate}
            onChange={onFilterDateToggle}
            className="rounded-md border border-gray-300 px-2.5 py-1.5 focus:border-blue-500 focus:outline-none"
          >
            {selectFilterOptions.map(({ value, label }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        )}
        <span className="font-medium text-gray-500">
          Showed{" "}
          <span className="font-bold text-gray-600">
            {productsCountPerPage}
          </span>{" "}
          out of{" "}
          <span className="font-bold text-gray-600">{productsCount}</span>{" "}
          products
        </span>
      </div>
      <div className="flex items-center gap-3">
        {layoutButtons.map(({ layout }) => (
          <Button
            isLayoutGrid={isLayoutGrid}
            layout={layout}
            onClick={onLayoutToggle}
            key={layout}
          />
        ))}
      </div>
    </div>
  );
}

function Button({ isLayoutGrid, layout, onClick }) {
  const gridLayout = layout === "grid";
  const Icon = layout === "grid" ? LuLayoutGrid : GoRows;
  return (
    <button
      onClick={onClick}
      className={`group flex cursor-pointer items-center ${isLayoutGrid === gridLayout ? "bg-blue-600" : "bg-gray-100"} justify-center rounded-md border border-gray-300 p-2 transition duration-300 hover:bg-blue-600`}
    >
      <Icon
        className={`h-5 w-5 transition duration-300 ${isLayoutGrid === gridLayout ? "text-white" : "text-gray-600"} group-hover:text-white`}
      />
    </button>
  );
}

export default MainHeader;
