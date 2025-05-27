"use client";

import SliderButtons from "./SliderButtons";
import SliderCard from "./SliderCard";
import Slider from "../compoundComponents/Slider";

function SliderCards({ products }) {
  return (
    <section className="relative overflow-x-hidden rounded-xl bg-white shadow-lg select-none sm:col-span-2">
      <Slider count={products.length}>
        <Slider.Cards>
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full flex-shrink-0 px-6 py-8 pb-15 sm:py-12 md:px-10"
            >
              <SliderCard product={product} />
            </div>
          ))}
        </Slider.Cards>
        <SliderButtons />
      </Slider>
    </section>
  );
}

export default SliderCards;
