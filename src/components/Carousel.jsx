// src/components/Carousel.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Carousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/home/carousel");
        setSlides(response.data);
      } catch (error) {
        console.error("Gagal mengambil gambar carousel:", error);
        // Fallback ke gambar default jika API gagal
        setSlides([
          { _id: '1', url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&auto=format&q=80" },
          { _id: '2', url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop&auto=format&q=80" },
        ]);
      }
    };
    fetchCarouselImages();
  }, []);

  if (slides.length === 0) {
    return <div className="w-full h-[60vh] bg-gray-200 animate-pulse"></div>; // Tampilkan loading state
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full h-[60vh] sm:h-[450px] md:h-[550px] lg:h-[650px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._id || index}>
            <div className="relative w-full h-full">
              <img
                src={slide.url} // Menggunakan URL dari backend
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-red-800 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-red-800 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4"></div>

      <style jsx="true" global="true">{`
        .swiper-pagination-bullet-custom {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          border-radius: 50% !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active-custom {
          background: white !important;
          transform: scale(1.2) !important;
        }

        .swiper-pagination-bullet-custom:hover {
          background: rgba(255, 255, 255, 0.8) !important;
        }
      `}</style>
    </div>
  );
}

export default Carousel;