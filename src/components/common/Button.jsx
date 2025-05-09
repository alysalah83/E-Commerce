function Button({
  children,
  scratch = false,
  scratchBig = false,
  type = "primary",
  size = "big",
  color = "bg-blue-600",
  hoverColor = "hover:bg-blue-700",
  disabled,
  onClick,
}) {
  if (type === "primary" && size === "big")
    return (
      <button
        className={`${scratch ? "w-full" : "w-fit"} ${scratchBig ? "lg:w-full" : ""} cursor-pointer rounded-lg ${
          typeof color === "object"
            ? `bg-gradient-to-br ${color.from} ${color.to}`
            : `${color}`
        } px-8 py-4 font-semibold tracking-wide text-slate-100 capitalize transition duration-300 disabled:cursor-not-allowed disabled:bg-blue-950 ${
          typeof hoverColor === "object"
            ? `bg-gradient-to-br ${hoverColor.from} ${hoverColor.to}`
            : `${hoverColor}`
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );

  if (type === "primary" && size === "small")
    return (
      <button
        className={`w-fit cursor-pointer rounded-md ${color} px-6 py-2 text-sm font-semibold tracking-wide text-slate-100 capitalize transition duration-300 disabled:cursor-not-allowed ${hoverColor}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );

  if (type === "secondary" && size === "big")
    return (
      <button className="w-fit cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-8 py-4 font-semibold tracking-wide text-slate-800 capitalize transition duration-300 hover:bg-blue-950 hover:text-blue-50">
        {children}
      </button>
    );

  if (type === "secondary" && size === "small")
    return (
      <button className="w-fit cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 font-semibold tracking-wide text-slate-800 capitalize transition duration-300 hover:bg-blue-950 hover:text-blue-50">
        {children}
      </button>
    );
}

export default Button;
