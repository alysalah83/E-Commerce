import { cloneElement } from "react";

function ButtonIcon({ children, onClick }) {
  return (
    <button
      className="cursor-pointer rounded-sm bg-white p-2"
      onClick={onClick}
    >
      {cloneElement(children, {
        className:
          "w-5 h-5 fill-slate-900 stroke-slate-900  hover:stroke-blue-700 hover:fill-blue-700 ",
      })}
    </button>
  );
}

export default ButtonIcon;
