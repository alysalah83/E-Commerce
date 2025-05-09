import Slider from "../common/compoundComponents/Slider";

function SliderButtons() {
  return (
    <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-4">
      <Slider.ButtonsLine>
        <button
          className={`h-1 cursor-pointer rounded-sm transition duration-300`}
          title="slider button"
        />
      </Slider.ButtonsLine>
    </div>
  );
}

export default SliderButtons;
