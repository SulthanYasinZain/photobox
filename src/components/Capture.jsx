import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const StableWebcam = React.memo(() => {
  return <Webcam audio={false} screenshotFormat="image/png" mirrored={true} />;
});

const Capture = ({ onCapture }) => {
  const navigate = useNavigate();
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const totalImagesRef = useRef(0);
  const captureTimeoutRef = useRef(null);

  const GotoReview = useCallback(() => {
    navigate("/review");
  }, [navigate]);

  const handleStartCapture = useCallback(() => {
    totalImagesRef.current = 0;
    setCapturing(true);
    setCountdown(3);
  }, []);

  const capture = useCallback(() => {
    const canvas = document.createElement("canvas");
    const video = document.querySelector("video");
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const imageSrc = canvas.toDataURL("image/png");

      console.log(`Capturing image ${totalImagesRef.current + 1}`);
      onCapture(imageSrc);
      totalImagesRef.current += 1;

      if (totalImagesRef.current >= 3) {
        console.log("Finished capturing");
        setCapturing(false);
        GotoReview();
      } else {
        setCountdown(3);
        captureTimeoutRef.current = setTimeout(() => {
          capture();
        }, 3000);
      }
    }
  }, [onCapture, GotoReview]);

  useEffect(() => {
    if (capturing && totalImagesRef.current === 0) {
      captureTimeoutRef.current = setTimeout(() => {
        capture();
      }, 3000);
    }

    return () => {
      if (captureTimeoutRef.current) {
        clearTimeout(captureTimeoutRef.current);
      }
    };
  }, [capturing, capture]);

  useEffect(() => {
    let countdownInterval;
    if (capturing) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 1) {
            return prevCountdown - 1;
          }
          return prevCountdown;
        });
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [capturing]);

  return (
    <div className="flex justify-around items-center h-screen">
      <StableWebcam />
      {!capturing && (
        <button onClick={handleStartCapture}>Start Capture</button>
      )}
      {capturing && <p>{countdown}</p>}
    </div>
  );
};

export default Capture;
