import NewHeader from "@/src/components/newSection/NewHeader";
import ProductCard from "../common/ProductCard";
import { getNewProductsWithLimit } from "@/src/lib/data-service";

async function NewSection() {
  const newProducts = await getNewProductsWithLimit();
  return (
    <section>
      <div className="mx-auto mt-5 max-w-7xl border-t border-gray-300 p-6 pt-15">
        <NewHeader />
        <main className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newProducts.map((newProduct) => (
            <ProductCard product={newProduct} key={newProduct.id} />
          ))}
        </main>
      </div>
    </section>
  );
}

export default NewSection;
