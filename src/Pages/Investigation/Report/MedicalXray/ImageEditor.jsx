import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import html2canvas from 'html2canvas';
import Xray from './xray.jpg'

const ImageEditor = () => {
  const stageRef = useRef(null);
  const [image] = useState(new window.Image());
  const [text, setText] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleCapture = () => {
    html2canvas(stageRef.current)
      .then((canvas) => {
        // Get the captured canvas as an image file
        const capturedImage = canvas.toDataURL('image/png');
        // Do something with the captured image (e.g., save, display, etc.)
        console.log(capturedImage);
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <br />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer ref={stageRef}>
          <Image image={image} />
          <Rect
            width={200}
            height={50}
            fill="white"
            draggable
            onDragEnd={(e) => {
              // Update the position of the text when dragged
              setText(e.target.x() + ',' + e.target.y());
            }}
          />
          <Text
            text={text}
            fontSize={18}
            draggable
            onDragEnd={(e) => {
              // Update the position of the text when dragged
              setText(e.target.text());
            }}
          />
        </Layer>
      </Stage>
      <br />
      <button onClick={handleCapture}>Capture Image</button>
    </div>
  );
};

export default ImageEditor;