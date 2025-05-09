"use client";

import { useEffect, useState } from "react";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";

function AddRatingStar({
  starsCount = 5,
  color = "text-amber-400",
  size = 24,
  setOutSideRating,
}) {
  const [curFilledStar, setCurFilledStar] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => setOutSideRating(rate), [rate]);

  return (
    <div className="flex">
      {Array.from({ length: starsCount }).map((_, i) => (
        <Star
          order={i + 1}
          curFilledStar={curFilledStar}
          setCurFilledStar={setCurFilledStar}
          rate={rate}
          setRate={setRate}
          color={color}
          size={size}
          key={`empty-${i}`}
        />
      ))}
    </div>
  );
}

function Star({
  curFilledStar,
  setCurFilledStar,
  rate,
  setRate,
  order,
  color,
  size,
}) {
  let Icon;

  if (rate && rate >= order) Icon = TiStarFullOutline;
  else if (curFilledStar >= order && curFilledStar) Icon = TiStarFullOutline;
  else Icon = TiStarOutline;

  const iconClass = `${color} cursor-pointer`;

  return (
    <Icon
      onMouseEnter={() => setCurFilledStar(order)}
      onMouseLeave={() => setCurFilledStar(null)}
      onClick={() =>
        setRate((curRate) =>
          curRate === curFilledStar && curRate ? null : curFilledStar,
        )
      }
      className={iconClass}
      size={size}
      aria-label={`star number ${order} rating button`}
    />
  );
}

export default AddRatingStar;
