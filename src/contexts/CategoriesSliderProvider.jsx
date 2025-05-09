"use client";

import { createContext, use, useEffect, useRef, useState } from "react";

const Context = createContext();

export function CategoriesSliderProvider({ children }) {
  const [position, setPosition] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [elementPerSlide, setElementPerSlide] = useState(4);
  const sliderRef = useRef(null);

  const updateDimensions = function () {
    const windowWidth = window.innerWidth;
    windowWidth >= 1000 ? setElementPerSlide(4) : setElementPerSlide(2);

    if (sliderRef.current) setSliderOffset(sliderRef.current.offsetWidth);
  };

  const handleScroll = () => {
    if (sliderRef.current) setPosition(sliderRef.current.scrollLeft);
  };

  useEffect(function () {
    let resizeTimer;

    updateDimensions();

    const handleResize = function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (sliderRef.current) setSliderOffset(sliderRef.current.offsetWidth);
  }, [sliderRef.current]);

  useEffect(() => {
    sliderRef.current?.addEventListener("scroll", handleScroll);

    return () => sliderRef.current?.removeEventListener("scroll", handleScroll);
  }, [sliderRef.current]);

  return (
    <Context
      value={{
        position,
        setPosition,
        sliderRef,
        elementPerSlide,
        setElementPerSlide,
        sliderOffset,
        setSliderOffset,
      }}
    >
      {children}
    </Context>
  );
}

export const usePosition = function () {
  const values = use(Context);
  if (values === undefined)
    throw new Error("the context is being used out of his scope");
  return values;
};
