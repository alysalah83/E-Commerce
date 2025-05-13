import MoveDownButton from "./MoveDownButton";
import MoveUpButton from "./MoveUpButton";

function ScrollButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-[999] inline-flex w-fit flex-col gap-y-2.5">
      <MoveUpButton />
      <MoveDownButton />
    </div>
  );
}

export default ScrollButtons;
