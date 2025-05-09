import TableRowWithCount from "./TableRowWithCount";
import TableRowWithoutCount from "./TableRowWithoutCount";

function Table({
  items,
  getItemCount,
  updateCount,
  removeFromLocal,
  withCount = false,
}) {
  const tableRowClass = `grid ${withCount ? "grid-cols-[4fr_1fr_2fr_1fr_0.5fr]" : "grid-cols-[0.5fr_4fr_1fr_1.5fr_1.5fr]"}  min-w-4xl py-5 border-b border-gray-200`;
  return (
    <>
      <header
        className={`${tableRowClass} pt-0 text-xl font-semibold tracking-wide text-gray-800`}
      >
        {withCount ? (
          <>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
            <div>Delete</div>
          </>
        ) : (
          <>
            <div></div>
            <div>Product</div>
            <div>Price</div>
            <div>Stock Status</div>
            <div>Action</div>
          </>
        )}
      </header>
      {items.map((item) =>
        withCount ? (
          <TableRowWithCount
            item={item}
            tableRowClass={tableRowClass}
            removeFromLocal={removeFromLocal}
            updateCount={updateCount}
            getItemCount={getItemCount}
            key={item.id}
          />
        ) : (
          <TableRowWithoutCount
            item={item}
            tableRowClass={tableRowClass}
            removeFromLocal={removeFromLocal}
            key={item.id}
          />
        ),
      )}
    </>
  );
}

export default Table;
