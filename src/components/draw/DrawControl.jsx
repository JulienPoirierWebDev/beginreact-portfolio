// Draw exercise
export const DrawControl = ({color, size}) => {

    const handleChangeColor = (event) => {
        color.current = event.target.value;
    }

    const handleChangeSize = (event) => {
        size.current = event.target.value;
    }
  return (
    <div>
      <label
        htmlFor="draw-color-picker"
        className="flex items-center justify-center gap-4"
      >
        Color
        <input id="draw-color-picker" type="color" onChange={handleChangeColor} />
      </label>
      <label
        htmlFor="draw-size-picker"
        className="flex items-center justify-center gap-4"
      >
        Line size
        <input id="draw-size-picker" type="range" min="2" max="32" step="2" onChange={handleChangeSize}/>
      </label>
    </div>
  );
};
