import Loader from "@/src/components/common/Loader";
import PageHeader from "@/src/components/common/PageHeader";
import ProductDescription from "@/src/components/product page/ProductDescription";
import ProductMain from "@/src/components/product page/ProductMain";
import { getAllProductsId } from "@/src/lib/data-service";
import { Suspense } from "react";

export const metadata = {
  title: "Product",
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getAllProductsId();

  return ids.map((obj) => ({
    productId: String(obj.id),
  }));
}

async function page({ params }) {
  const { productId } = await params;

  return (
    <div>
      <PageHeader heading="product details" />
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <Suspense fallback={<Loader />}>
          <ProductMain productId={productId} />
        </Suspense>
      </main>
      <div className="bg-gray-100">
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
          <Suspense fallback={<Loader />}>
            <ProductDescription productId={productId} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default page;
