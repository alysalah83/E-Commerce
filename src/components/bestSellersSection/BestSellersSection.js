import SectionHeader from "../common/SectionHeader";
import { RiShoppingBag3Line } from "react-icons/ri";
import BestSellersCards from "./BestSellersCards";
import Button from "../common/Button";
import Link from "next/link";

function BestSellersSection() {
  return (
    <section>
      <div className="mx-auto mt-16 max-w-7xl p-6 pt-0">
        <SectionHeader
          title="This Month"
          label="Best Sellers"
          icon={<RiShoppingBag3Line />}
        />
        <BestSellersCards />
        <div className="mt-12 text-center">
          <Link href="/popular">
            <Button type="secondary">view all</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellersSection;
