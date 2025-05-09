import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function SliderButtons({
  leftBtnOnClick,
  rightBtnOnClick,
  leftBtnDisabled,
  rightBtnDisabled,
}) {
  return (
    <>
      <button
        className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200"
        onClick={leftBtnOnClick}
        disabled={leftBtnDisabled}
      >
        <SlArrowLeft className="h-5 w-5 fill-slate-900" />
      </button>
      <button
        className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200"
        onClick={rightBtnOnClick}
        disabled={rightBtnDisabled}
      >
        <SlArrowRight className="h-5 w-5 fill-slate-900" />
      </button>
    </>
  );
}

export default SliderButtons;
