import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  // width: { min: 20 },
  // height: { min: 220 },
  aspectRatio: 1,
  facingMode: 'user',
  // facingMode: 'environment',
};

const Camera = ({ imgSrc, setImgSrc }) => {
  const webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1000,
      height: 1200,
    });
    // console.log('imageSrc', imageSrc);
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);


  return (
    <>
      <div className='d-flex align-items-center justify-content-center'>
        <Webcam
          audio={false}
          width={417}
          height={500}
          // minScreenshotHeight={720}
          // minScreenshotWidth={1280}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          screenshotQuality={1}
          videoConstraints={videoConstraints}
          // onUserMedia={(e) => {
          //   console.log('onUserMedia', e);
          // }}
          mirrored={true}
        />
      </div>

      <div className='modal-footer pb-0'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setImgSrc(null)}
          data-bs-dismiss='modal'
        >
          Clear Photo
        </button>
        <button
          type='button'
          className='btn btn-primary'
          onClick={capture}
          data-bs-dismiss='modal'
        >
          Capture Photo
        </button>
      </div>
      {/* <button onClick={() => setImgSrc(null)}>Clear photo</button> */}
      {/* <button onClick={() => uploadImage()}>Upload Image</button> */}
      {/* {imgSrc && <img src={imgSrc} alt='Screenshot' />} */}
    </>
  );
};

export default Camera;
