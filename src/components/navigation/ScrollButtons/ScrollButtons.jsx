import MoveDownButton from "./MoveDownButton";
import MoveUpButton from "./MoveUpButton";

function ScrollButtons() {
  return (
    <div className="z-[999]flex fixed right-4 bottom-4 inline-flex w-fit flex-col gap-y-2.5">
      <MoveUpButton />
      <MoveDownButton />
    </div>
  );
}

export default ScrollButtons;
