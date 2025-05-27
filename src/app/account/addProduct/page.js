import AddProductForm from "@/src/components/addProduct/AddProductForm";
import Loader from "@/src/components/common/Loader";
import { getCategories } from "@/src/lib/data-service";
import { Suspense } from "react";

function page() {
  const categoriesPromise = getCategories();

  return (
    <div className="w-full bg-gray-100 p-6">
      <Suspense fallback={<Loader />}>
        <AddProductForm categoriesPromise={categoriesPromise} />
      </Suspense>
    </div>
  );
}

export default page;
