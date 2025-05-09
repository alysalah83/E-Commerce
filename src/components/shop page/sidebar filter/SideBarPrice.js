"use client";

import { useState } from "react";
import SliderRangePrice from "./SliderRangePrice";
import ToggleMenu from "./ToggleMenu";

function SideBarPrice({ highestPriceValue }) {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => setToggle((cur) => !cur);

  return (
    <div className="rounded-md bg-white shadow-md">
      <ToggleMenu label="Price" toggle={toggle} onClick={handleToggle} />

      {toggle && <SliderRangePrice highestPriceValue={highestPriceValue} />}
    </div>
  );
}

export default SideBarPrice;
