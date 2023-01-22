import React from 'react';
import {Button} from "../atom/Button";

const DrawReset = ({canvas}) => {

    const handleClear = () => {
        let ctx = canvas.current.getContext("2d");
        ctx.clearRect(0,0,canvas.current.width, canvas.current.height)
    }

    return (
        <Button onClick={handleClear}>Reset</Button>
    );
};

export default DrawReset;
