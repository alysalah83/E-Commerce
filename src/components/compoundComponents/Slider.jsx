"use client";

import {
  SLIDER_AUTO_ROTATE_TIME,
  SLIDER_TRASHLOAD_PERCENTAGE,
} from "@/src/lib/config";
import { isPositive } from "@/src/lib/helper";
import {
  Children,
  cloneElement,
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SliderContext = createContext(null);

function useSliderContext() {
  const context = use(SliderContext);
  if (!context) {
    throw new Error("Slider components must be used within a Slider component");
  }
  return context;
}

function Slider({ children, count }) {
  const [slideActive, setSlideActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const dragStartX = useRef(0);

  const moveForward = useCallback(
    () => setSlideActive((cur) => (cur !== count - 1 ? cur + 1 : cur)),
    [count],
  );

  const moveBackward = useCallback(
    () => setSlideActive((cur) => (cur !== 0 ? cur - 1 : cur)),
    [],
  );

  const moveForwardAuto = useCallback(
    () => setSlideActive((cur) => (cur !== count - 1 ? cur + 1 : 0)),
    [count],
  );

  const resetDragging = useCallback(() => {
    setDragOffset(0);
    setIsDragging(false);
  }, []);

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    dragStartX.current = e.touches?.[0].clientX || e.clientX;
  }, []);

  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const currentX = e.touches?.[0].clientX || e.clientX;
      const movedDistance = dragStartX.current - currentX;

      setDragOffset(movedDistance);
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(
    (e) => {
      if (!isDragging) return;

      const end = e.changedTouches?.[0].clientX || e.clientX;
      const movedDistance = dragStartX.current - end;

      if (sliderRef.current) {
        const threshold =
          sliderRef.current.offsetWidth * SLIDER_TRASHLOAD_PERCENTAGE;

        if (Math.abs(movedDistance) > threshold) {
          isPositive(movedDistance) ? moveForward() : moveBackward();
        }

        resetDragging();
      }
    },
    [isDragging, moveForward, moveBackward, resetDragging],
  );

  return (
    <SliderContext
      value={{
        slideActive,
        setSlideActive,
        isDragging,
        sliderRef,
        moveForward,
        moveBackward,
        moveForwardAuto,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        count,
        dragOffset,
      }}
    >
      {children}
    </SliderContext>
  );
}

function Cards({ children }) {
  const {
    sliderRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isDragging,
    slideActive,
    dragOffset,
  } = useSliderContext();

  return (
    <div
      className={`flex ${isDragging ? "" : "transition duration-500"}`}
      style={{
        transform: `translateX(calc(${-slideActive * 100}% + ${-dragOffset}px))`,
      }}
      ref={sliderRef}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {children}
    </div>
  );
}

function ButtonsLine({
  children,
  activeClassName = "w-10 bg-blue-700",
  inactiveClassName = "w-6 bg-slate-300",
}) {
  const { isDragging, moveForwardAuto, slideActive, setSlideActive, count } =
    useSliderContext();

  useEffect(
    function () {
      const id = setInterval(() => {
        if (!isDragging || slideActive) moveForwardAuto();
      }, SLIDER_AUTO_ROTATE_TIME);

      return () => clearInterval(id);
    },
    [isDragging, slideActive],
  );

  return Array.from({ length: count }).map((_, i) =>
    cloneElement(children, {
      onClick: () => setSlideActive(i),
      key: i,
      className: `${slideActive === i ? activeClassName : inactiveClassName} ${children.props.className}`,
    }),
  );
}

function NavButtons({ children }) {
  const { slideActive, count, moveForward, moveBackward } = useSliderContext();

  const childrenArray = Children.toArray(children);

  const PrevButton = cloneElement(childrenArray[0], {
    ...childrenArray[0].props,
    onClick: moveBackward,
    disabled: slideActive === 0,
  });

  const NextButton = cloneElement(childrenArray[1], {
    ...childrenArray[1].props,
    onClick: moveForward,
    disabled: slideActive === count - 1,
  });

  return (
    <>
      {PrevButton}
      {NextButton}
    </>
  );
}

Slider.Cards = Cards;
Slider.ButtonsLine = ButtonsLine;
Slider.NavButtons = NavButtons;

export default Slider;
