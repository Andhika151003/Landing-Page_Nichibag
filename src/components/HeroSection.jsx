import React from "react";
import Button from "./ButtonPesan";

const HeroSection = () => {
  return (
<div className="relative min-h-screen bg-gradient-to-br from-[#fff8f2] via-[#f8d7d0] to-[#a94442]/30 overflow-hidden flex items-center">
  {/* Background Text */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="text-[clamp(5rem,15vw,20rem)] font-bold text-[#a94442]/10 select-none">
      NICHIBAG
    </div>
  </div>

  {/* Main Content Wrapper */}
  <div className="relative z-10 flex flex-wrap items-center justify-between max-w-7xl mx-auto px-8 gap-12 w-full">
    {/* Left Content */}
    <div className="flex-1 min-w-[300px] max-w-lg">
      <div className="space-y-4 mb-8">
        <h2 className="text-5xl font-bold text-gray-800 leading-tight">Brand New</h2>
        <h2 className="text-5xl font-bold text-gray-800 leading-tight">Paper Craft</h2>
        <h2 className="text-5xl font-bold text-gray-800 leading-tight">Eco Friendly</h2>
      </div>
      <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
        NichiBag.id tidak hanya menawarkan produk yang estetik dan fungsional, tetapi juga mendukung gaya hidup eco-friendly dengan mengurangi limbah dan memanfaatkan bahan yang dapat diperbaharui.
      </p>
      <div className="flex items-center space-x-3 px-1 py-2">
        <Button />
      </div>
    </div>

    {/* Right Content */}
    <div className="flex-1 min-w-[300px] flex justify-center items-center relative">
      {/* Badge */}
      <div className="absolute top-[5%] right-[5%] bg-white rounded-2xl shadow-lg px-6 py-4 z-20">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">20+</div>
          <div className="text-sm text-gray-500">Bag Type</div>
          <div className="text-sm text-gray-500">Available</div>
        </div>
      </div>

      {/* Bags */}
      <div className="relative w-[clamp(15rem,30vw,32rem)] h-[clamp(13rem,25vw,28rem)] flex items-center justify-center">
        {/* Bag shapes */}
        <div className="w-[70%] h-[90%] bg-gradient-to-b from-red-100 to-red-200 rounded-xl shadow-xl transform rotate-6">
          <div className="w-full h-12 bg-red-300 rounded-t-xl"></div>
          <div className="flex justify-center pt-6">
            <div className="w-24 h-6 bg-red-400 rounded-full"></div>
          </div>
        </div>
        <div className="absolute -left-12 top-12 w-[60%] h-[80%] bg-gradient-to-b from-orange-100 to-orange-200 rounded-xl shadow-lg transform -rotate-12">
          <div className="w-full h-10 bg-orange-300 rounded-t-xl"></div>
          <div className="flex justify-center pt-5">
            <div className="w-18 h-5 bg-orange-400 rounded-full"></div>
          </div>
        </div>
        <div className="absolute -right-8 top-16 w-[55%] h-[75%] bg-gradient-to-b from-red-50 to-red-100 rounded-xl shadow-md transform rotate-12">
          <div className="w-full h-9 bg-red-200 rounded-t-xl"></div>
          <div className="flex justify-center pt-4">
            <div className="w-16 h-4 bg-red-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default HeroSection;
