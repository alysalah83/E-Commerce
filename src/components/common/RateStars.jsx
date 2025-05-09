import {
  TiStarOutline,
  TiStarHalfOutline,
  TiStarFullOutline,
} from "react-icons/ti";

function RateStars({
  rating,
  showLabel = true,
  starCount = 5,
  size = 24,
  color = "text-amber-400",
}) {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
  const extraFullStar = decimal >= 0.75 ? 1 : 0;

  const totalFullStars = fullStars + extraFullStar;
  const totalEmptyStars = starCount - totalFullStars - (hasHalfStar ? 1 : 0);

  const iconClass = `${color}`;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: totalFullStars }).map((_, i) => (
          <TiStarFullOutline
            className={iconClass}
            size={size}
            key={`full-${i}`}
          />
        ))}

        {hasHalfStar && <TiStarHalfOutline className={iconClass} size={size} />}

        {Array.from({ length: totalEmptyStars }).map((_, i) => (
          <TiStarOutline className={iconClass} size={size} key={`empty-${i}`} />
        ))}
      </div>
      {showLabel && (
        <span className="text-lg font-semibold text-gray-400">
          ({rating % 1 === 0 ? rating.toFixed(0) : rating.toFixed(1)})
        </span>
      )}
    </div>
  );
}

export default RateStars;
