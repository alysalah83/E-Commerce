import CategoriesHeader from "./CategoriesHeader";
import CategoriesBar from "./CategoriesBar";
import { getCategories } from "@/src/lib/data-service";
import { CategoriesSliderProvider } from "@/src/contexts/CategoriesSliderProvider";

async function CategoriesSection() {
  const categories = await getCategories();

  return (
    <section data-threshold="true">
      <div className="mx-auto mt-16 max-w-7xl p-6 pt-0">
        <CategoriesSliderProvider>
          <CategoriesHeader />
          <CategoriesBar categories={categories} />
        </CategoriesSliderProvider>
      </div>
    </section>
  );
}

export default CategoriesSection;
