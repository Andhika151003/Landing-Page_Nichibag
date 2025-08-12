// HeroTitle.jsx
import React from "react";

const HeroTitle = () => {
  return (
    <div className="group cursor-pointer relative inline-block">
      <span className="absolute inset-0 bg-gradient-to-r from-[#ffffff]/40 to-[#FFD700]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      <span className="relative z-10 font-bold text-white transition duration-300 group-hover:text-white">
        Packagingmu Identitas Brandmu
      </span>
    </div>
  );
};

export default HeroTitle;
