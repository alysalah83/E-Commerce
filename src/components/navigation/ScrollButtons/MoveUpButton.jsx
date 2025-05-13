"use client";

import { isPositive } from "@/src/lib/helper";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

function MoveUpButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef();

  useEffect(function () {
    if (!buttonRef.current) return;
    const thresholdElement = document.querySelector('[data-threshold="true"]');

    const observerCallBack = function (entries) {
      const [entry] = entries;

      entry.isIntersecting || !isPositive(entry.boundingClientRect.y)
        ? setIsVisible(true)
        : setIsVisible(false);
    };
    const options = {
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallBack, options);

    observer.observe(thresholdElement);

    return () => observer.disconnect();
  }, []);

  const handleScrollUp = function () {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  return (
    <button
      className={`cursor-pointer rounded-md ${isVisible ? "block" : "hidden"} bg-blue-700 p-1 hover:bg-blue-800`}
      onClick={handleScrollUp}
      ref={buttonRef}
      aria-label="Scroll to Up Button"
    >
      <MdKeyboardArrowUp className="h-7 w-7 fill-slate-100 lg:h-9 lg:w-9" />
    </button>
  );
}

export default MoveUpButton;
