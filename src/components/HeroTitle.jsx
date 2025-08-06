import React from "react";

const HeroTitle = () => {
  return (
    <div className="group cursor-pointer relative inline-block">
      <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white transition duration-300 group-hover:text-white">
        Packagingmu Identitas Brand kamu
      </h1>
    </div>
  );
};

export default HeroTitle;