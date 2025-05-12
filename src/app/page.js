import HeroSection from "@/src/components/heroSection/HeroSection";
import CategoriesSection from "../components/categoriesSection/CategoriesSection";
import NewSection from "../components/newSection/NewSection";
import OfferSection from "../components/offerSection/OfferSection";
import BestSellersSection from "../components/bestSellersSection/BestSellersSection";
import LimitedTimeOfferSection from "../components/limitedTimeOfferSection/LimitedTimeOfferSection";
import TestimonialsSection from "../components/testimonialsSection/TestimonialsSection";
import ScrollButtons from "../components/navigation/ScrollButtons/ScrollButtons";

export const dynamic = "force-static";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <NewSection />
      <OfferSection />
      <BestSellersSection />
      <LimitedTimeOfferSection />
      <TestimonialsSection />
      <ScrollButtons />
    </>
  );
}
