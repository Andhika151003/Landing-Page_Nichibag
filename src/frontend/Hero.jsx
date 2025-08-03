import React, { useState } from "react";
import Hero1 from "../assets/hero1.png";
import Hero2 from "../assets/hero2.png";
import Hero3 from "../assets/hero3.png";

const images = [
  { image: Hero1, alt: "Gift Bag Black" },
  { image: Hero2, alt: "Gift Bag Blue" },
  { image: Hero3, alt: "Gift Bag Green" },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden mt-20">
      {images.map((item, i) => (
        <img
          key={i}
          src={item.image}
          alt={item.alt}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Tombol navigasi kiri */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-3 py-1 rounded-full shadow-md z-20"
      >
        ❮
      </button>

      {/* Tombol navigasi kanan */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-3 py-1 rounded-full shadow-md z-20"
      >
        ❯
      </button>
    </div>
  );
};

export default Hero;
