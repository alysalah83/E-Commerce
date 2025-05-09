import Link from "next/link";

function ButtonLink({
  color = "bg-blue-600",
  hoverColor = "hover:bg-blue-700",
  href = "/",
  children,
  scratch = true,
  classes,
  onClick,
  buttonLargePadding = false,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${color} ${scratch ? "w-full" : "w-fit"} flex cursor-pointer items-center justify-center rounded-lg ${buttonLargePadding ? "px-20 lg:px-30" : "px-10"} py-4 font-semibold text-nowrap text-blue-50 capitalize transition duration-300 lg:text-lg ${classes} ${hoverColor}`}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
