import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../styles/carousel.css";

import Img1 from "../assets/Carousel1.png";
import Img2 from "../assets/Carousel2.png";
import Img3 from "../assets/Carousel3.png";

const heroContent = [
  {
    img: Img1,
  },
  {
    img: Img2,
  },
  {
    img: Img3,
  }
];

function Carousel() {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8 z-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination-custom',
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom'
        }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full h-[60vh] rounded-lg overflow-hidden shadow-lg"
      >
        {heroContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img 
                src={slide.img} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"></div>


    </div>
  );
}

export default Carousel;