import { useRef } from "react";
import { Button } from "../atom/Button";
import { DrawCanvas } from "./DrawCanvas";
import { DrawControl } from "./DrawControl";
import DrawReset from "./DrawReset";
import DrawSave from "./DrawSave";


// Draw exercise
export const Draw = () => {
  const canvas = useRef(null);
  const color = useRef("#000000");
  const size = useRef(4);

  return (
    <div className="flex flex-col gap-8">
      <DrawCanvas canvas={canvas} color={color} size={size}/>
      <DrawControl color={color} size={size} />
      <div className="m-auto flex gap-4">
          <DrawReset canvas={canvas}/>
          <DrawSave canvas={canvas}/>
      </div>
    </div>
  );
};
