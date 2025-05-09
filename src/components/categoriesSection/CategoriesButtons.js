"use client";

import { usePosition } from "@/src/contexts/CategoriesSliderProvider";
import SliderButtons from "../common/SliderButtons";

function CategoriesButtons() {
  const { position, sliderRef, canScrollLeft, canScrollRight } = usePosition();

  const handleSlideRight = function () {
    if (!sliderRef.current) return;

    const nextPosition = position + sliderRef.current.offsetWidth * 1.1;

    sliderRef.current.scrollTo({
      left: nextPosition,
      behavior: "smooth",
    });
  };

  const handleSlideLeft = function () {
    if (!sliderRef.current) return;

    const prevPosition = Math.max(
      0,
      position - sliderRef.current.offsetWidth * 1.1,
    );

    sliderRef.current.scrollTo({
      left: prevPosition,
      behavior: "smooth",
    });
  };

  return (
    <SliderButtons
      leftBtnOnClick={handleSlideLeft}
      rightBtnOnClick={handleSlideRight}
      leftBtnDisabled={canScrollLeft}
      rightBtnDisabled={canScrollRight}
    />
  );
}

export default CategoriesButtons;
