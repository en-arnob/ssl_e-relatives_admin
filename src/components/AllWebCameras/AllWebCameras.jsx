import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const AllWebCameras = () => {
  const [devices, setDevices] = useState([]);
  const webcamRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      const videoDevices = mediaDevices.filter(
        ({ kind }) => kind === 'videoinput'
      );
      setDevices(videoDevices);
    });
  }, []);
  return (
    <>
      {devices.map((device, key) => (
        <div key={key}>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width={1280}
            videoConstraints={{
              deviceId: device.deviceId,
              facingMode: 'user',
            }}
          />
          {
            device.label || `Device ${key + 1}`
          }
        </div>
      ))}
    </>
  );
};

export default AllWebCameras;
