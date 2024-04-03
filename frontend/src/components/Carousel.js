import React, { useState, useEffect } from 'react';
import { carouselData } from '../constants/constants';

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next image index
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 10000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [carouselData]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  return (
    <div className="relative mt-6">
      <h2 className="text-2xl font-bold mb-4">What's hot</h2>
      <div className="carousel relative flex justify-center items-center">
        <div className="carousel-container flex gap-6 justify-center items-center">
          <button
            className="prev-button bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center focus:outline-none"
            onClick={handlePrevClick}
          >
            &lt;
          </button>
          {carouselData.map((item, index) => (
            <div key={index} className={`relative ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <img
                src={item.image}
                alt={item.title}
                className="carousel-image"
              />
              <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1">{item.title}</p>
            </div>
          ))}
          <button
            className="next-button bg-gray-800 text-white rounded-full w-10 h-10 flex justify-center items-center focus:outline-none"
            onClick={handleNextClick}
          >
            &gt;
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full mx-1 focus:outline-none ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
