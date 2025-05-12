import {
  getHightestRatedProducts,
  getProductsCount,
} from "@/src/lib/data-service";
import MainPopular from "@/src/components/popular page/MainPopular";
import PageHeader from "@/src/components/common/PageHeader";

export const dynamic = "force-static";

export const metadata = {
  title: "Popular",
};

async function page({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const [products, count] = await Promise.all([
    getHightestRatedProducts({
      allProducts: true,
      page,
    }),
    getProductsCount(),
  ]);

  return (
    <div className="bg-slate-200">
      <PageHeader heading="Our Best Products" />
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-10 md:px-10">
        <MainPopular products={products} productsCount={count} />
      </div>
    </div>
  );
}

export default page;
