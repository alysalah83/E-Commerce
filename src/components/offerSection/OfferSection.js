import { getHightestDiscountProducts } from "@/src/lib/data-service";
import OfferCard from "./OfferCard";

async function OfferSection() {
  const products = (await getHightestDiscountProducts()).slice(0, 3);
  return (
    <section>
      <div className="mx-auto mt-5 max-w-7xl p-6 pt-15">
        <div className="grid grid-rows-3 gap-8 lg:grid-cols-2 lg:grid-rows-2">
          <OfferCard
            product={products.at(0)}
            type="primary"
            bgColor={{ from: "from-amber-500", to: "to-sky-500" }}
            buttonColor={{ from: "from-amber-500", to: "to-sky-500" }}
            buttonHoverColor={{ from: "from-amber-600", to: "to-sky-600" }}
          />
          <OfferCard
            product={products.at(1)}
            type="secondary"
            bgColor="bg-sky-100"
            buttonColor="bg-sky-600"
            buttonHoverColor="hover:bg-sky-700"
          />
          <OfferCard
            product={products.at(2)}
            type="secondary"
            bgColor="bg-yellow-100"
            buttonColor="bg-yellow-600"
            buttonHoverColor="hover:bg-yellow-700"
          />
        </div>
      </div>
    </section>
  );
}

export default OfferSection;
