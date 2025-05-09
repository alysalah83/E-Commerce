import { cloneElement } from "react";

function SectionHeader({ title, label, icon, button }) {
  return (
    <header className="mb-9 flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <span className="flex items-center gap-2">
          {icon &&
            cloneElement(icon, {
              className: "h-6 w-6 text-blue-700",
            })}
          <span className="str text-lg font-semibold capitalize">{title}</span>
        </span>
        <h2 className="text-2xl font-bold text-blue-950 capitalize">{label}</h2>
      </div>
      {button && <div className="flex gap-4">{button}</div>}
    </header>
  );
}

export default SectionHeader;
