"use client";
import { useState } from "react";
import { GoScreenFull } from "react-icons/go";
import OverLay from "../common/OverLay";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

function ProductImageWindow({ image, title }) {
  const [showFullImage, setShowFullImage] = useState(false);
  const handleToggleWindow = () => setShowFullImage((cur) => !cur);

  return (
    <>
      <span
        onClick={handleToggleWindow}
        className="absolute top-5 right-5 z-5 cursor-pointer rounded-md bg-white p-2 text-gray-600 shadow-md transition duration-300 hover:text-blue-600"
      >
        <GoScreenFull className="h-6 w-6" />
      </span>
      {showFullImage && (
        <>
          <OverLay
            visible={showFullImage}
            handleToggleVisibility={handleToggleWindow}
            color="bg-black/90"
          />
          <div
            className={`fixed ${showFullImage ? "block" : "hidden"} top-1/2 left-1/2 z-40 h-1/2 w-1/2 -translate-1/2`}
          >
            <div className="relative z-40 h-full w-full">
              <Image
                src={image}
                fill
                alt={`${title} image`}
                className="z-40 cursor-default object-contain"
              />
            </div>
          </div>
          <div
            onClick={handleToggleWindow}
            className="fixed top-10 right-15 z-40 cursor-pointer"
          >
            <IoMdClose className="h-10 w-10 text-white" />
          </div>
        </>
      )}
    </>
  );
}

export default ProductImageWindow;
