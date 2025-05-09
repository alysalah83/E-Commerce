import ProductCard from "../../common/ProductCard";
import RowProductCard from "../../common/RowProductCard";
import EmptyProducts from "./EmptyProducts";

function ProductItems({ products, isLayoutGrid, bigLayout = false }) {
  if (products.length === 0) return <EmptyProducts />;
  return (
    <div
      className={`mb-16 grid ${isLayoutGrid ? `${bigLayout ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"}` : "grid-rows-1"} gap-8 lg:mb-20`}
    >
      {products.map((product) =>
        isLayoutGrid ? (
          <ProductCard product={product} key={product.id} />
        ) : (
          <RowProductCard product={product} key={product.id} />
        ),
      )}
    </div>
  );
}

export default ProductItems;
