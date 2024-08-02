const Review = ({ images, Reset }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-4">Review Captured Images</h1>
      <div className="grid grid-cols-1 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Capture ${index + 1}`}
              className="w-64 h-64 object-cover"
            />
          </div>
        ))}

        <button onClick={Reset}>Retake</button>
      </div>
    </div>
  );
};

export default Review;
