"use client";

import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function MoveDownButton() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef();

  useEffect(function () {
    if (!buttonRef.current) return;
    const thresholdElement = document.querySelector("footer");

    const observerCallBack = function (entries) {
      const [entry] = entries;

      !entry.isIntersecting ? setIsVisible(true) : setIsVisible(false);
    };
    const options = {
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallBack, options);

    observer.observe(thresholdElement);

    return () => observer.disconnect();
  }, []);

  const handleScrollDown = function () {
    window.scrollTo({
      behavior: "smooth",
      top: document.body.scrollHeight,
    });
  };

  return (
    <button
      className={`cursor-pointer rounded-md ${isVisible ? "block" : "hidden"} bg-blue-700 p-1 hover:bg-blue-800`}
      onClick={handleScrollDown}
      ref={buttonRef}
      aria-label="Scroll to Down Button"
    >
      <MdKeyboardArrowDown className="h-7 w-7 fill-slate-100 lg:h-9 lg:w-9" />
    </button>
  );
}

export default MoveDownButton;
