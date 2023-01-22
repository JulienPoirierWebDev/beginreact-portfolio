import {useEffect, useRef} from "react";
import {getCoordinates} from "../../lib/canvas";

// Draw exercise
export const DrawCanvas = ({ canvas, color, size }) => {
  const isDrawing = useRef(false);
  const lastCoordinate = useRef(null);

  const startDrawing = (event) => {
    isDrawing.current = true;
    lastCoordinate.current = getCoordinates(event, canvas.current);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (event) => {
    if(!isDrawing.current) return;

    const coordinate = getCoordinates(event, canvas.current)

    let ctx = canvas.current.getContext('2d');

    if(!ctx || !coordinate) return;

    if(lastCoordinate.current) {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color.current;
      ctx.lineWidth = size.current;
      ctx.moveTo(lastCoordinate.current.x, lastCoordinate.current.y);
      ctx.lineTo(coordinate.x, coordinate.y)
      //ctx.arc(lastCoordinate.current.x, lastCoordinate.current.y,size.current/2,0, 2 * Math.PI)
      //ctx.arc((lastCoordinate.current.x + coordinate.x) / 2, (lastCoordinate.current.y + coordinate.y) / 2,size.current/2,0, 2 * Math.PI);
      ctx.stroke()
    }

    lastCoordinate.current = coordinate;

  };

  useEffect(() => {
    const handleMouseUp = () => {
      stopDrawing()
    }

    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      removeEventListener('mouseup', handleMouseUp)
    }
  }, []);

  return (
      <canvas
          onMouseDown={startDrawing}
          onMouseMove={draw}
          width={560}
          height={315}
          ref={canvas}
          className="m-auto rounded-md bg-white shadow-md"
      />
  );
};
