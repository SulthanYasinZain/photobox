import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Capture from "./components/Capture";
import Review from "./components/Review";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleCapture = useCallback((imageSrc) => {
    setImages((prevImages) => {
      if (prevImages.length < 3 && !prevImages.includes(imageSrc)) {
        return [...prevImages, imageSrc];
      }
      return prevImages;
    });
  }, []);

  const handlereset = () => {
    setImages([]);
    navigate("/capture");
  };

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/capture" element={<Capture onCapture={handleCapture} />} />
      <Route
        path="/review"
        element={<Review images={images} Reset={handlereset} />}
      />
    </Routes>
  );
}

export default AppWrapper;
