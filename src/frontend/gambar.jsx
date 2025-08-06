import React, { useState } from "react";
import Hero1 from "../assets/hero1.png";
import Hero2 from "../assets/hero2.png";
import Hero3 from "../assets/hero3.png";

const ImageList = [
  {
    ImgSrc: Hero1,
  },
  
  {
    ImgSrc: Hero2,
  },


  {
    ImgSrc: Hero3,
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const index = (currentIndex - 1 + ImageList.length) % ImageList.length;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = (currentIndex + 1) % ImageList.length;
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl px-4 py-8 relative">
        

        {/* Gambar */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
          <img
            src={ImageList[currentIndex].ImgSrc}
            alt={ImageList[currentIndex].Title}
            className="w-full object-cover max-h-[500px] transition duration-500"
          />

          {/* Tombol navigasi */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-amber-600 text-red-800 px-3 py-1 rounded-full shadow"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-amber-700 text-red-800 px-3 py-1 rounded-full shadow"
          >
            ❯
          </button>
        </div>

        {/* Judul produk */}
        <h2 className="mt-4 text-center text-lg font-semibold text-gray-700">
          {ImageList[currentIndex].Title}
        </h2>

        {/* Indikator bulat */}
        <div className="flex justify-center mt-4 gap-2">
          {ImageList.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-red-800 scale-110" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;