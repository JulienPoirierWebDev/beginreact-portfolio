import React, {useEffect} from 'react';
import {Button} from "../atom/Button";

const DrawSave = ({canvas}) => {

    const handleSave = () => {
        let image = canvas.current.toDataURL("image/png").replace("image/png","image/octet-stream")
        window.localStorage.href=image;
    }

    useEffect(() => {
        const handleDownload = () => {
                const link = document.createElement('a');
                link.download = 'myDrawing.png';
                link.href = canvas.current.toDataURL();
                link.click();
                link.delete;
        }
        const download = document.getElementById('download');
        download.addEventListener('click', handleDownload);
        return () => {
            removeEventListener('click', handleDownload);
        }

    }, [])
    return (
        <Button id="download" onClick={handleSave}>Save my drawing</Button>
    );
};

export default DrawSave;
