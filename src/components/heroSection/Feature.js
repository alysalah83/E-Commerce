import { cloneElement } from "react";

function Feature({ feature: { icon, title, label } }) {
  return (
    <div className="flex items-center gap-3">
      {cloneElement(icon, {
        className: "h-10 w-10 self-center fill-slate-950",
      })}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-slate-950 capitalize">
          {title}
        </h3>
        <span className="text-sm text-slate-500">{label}</span>
      </div>
    </div>
  );
}

export default Feature;
