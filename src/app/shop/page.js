import FilterSideBar from "@/src/components/shop page/sidebar filter/FilterSideBar";
import MainShop from "@/src/components/shop page/main content/MainShop";
import { ProductsProvider } from "@/src/contexts/ProductsProvider";
import PageHeader from "@/src/components/common/PageHeader";

function page() {
  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore All Products" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-10 md:flex-row md:items-stretch md:px-10">
        <FilterSideBar />
        <ProductsProvider>
          <MainShop />
        </ProductsProvider>
      </div>
    </div>
  );
}

export default page;
