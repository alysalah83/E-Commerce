import DiscountsCard from "./DiscountsCard";
import SliderCards from "./SliderCards";
import { CARD_NUMBER_SLICE } from "@/src/lib/config";
import { getHightestDiscountProducts } from "@/src/lib/data-service";
import FeaturesBar from "./FeaturesBar";

async function HeroSection() {
  const products = await getHightestDiscountProducts();

  return (
    <section className="flex-2 bg-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid-rows-[2fr 1fr 1fr 0.5fr] sm:grid-row-[3fr 2fr 1fr] grid gap-6 p-5 sm:grid-cols-2">
          <SliderCards products={products.slice(0, CARD_NUMBER_SLICE)} />
          <DiscountsCard products={products.slice(CARD_NUMBER_SLICE)} />
          <FeaturesBar />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
