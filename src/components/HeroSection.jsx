import React from "react";
import Gambar from "../assets/hero1.png";
import { ShoppingBag } from "lucide-react";
import Button from "./ButtonPesan";

const App = () => {
  return <Handbag />;
};

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fff8f2] via-[#f8d7d0] to-[#a94442]/30 overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[20rem] font-bold text-[#a94442]/10 select-none">
          NICHIBAG
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wider">
          NICHIBAG.ID
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-8 py-16">
        {/* Left Content */}
        <div className="flex-1 max-w-lg">
          <div className="space-y-4 mb-8">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight">
              Brand New
            </h2>
            <h2 className="text-5xl font-bold text-gray-800 leading-tight">
              Paper Craft
            </h2>
            <h2 className="text-5xl font-bold text-gray-800 leading-tight">
              Eco Friendly
            </h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
            NichiBag.id tidak hanya menawarkan produk yang estetik dan
            fungsional, tetapi juga mendukung gaya hidup eco-friendly dengan
            mengurangi limbah dan memanfaatkan bahan yang dapat diperbaharui.
          </p>

          <div className="flex items-center space-x-3 px-1 py-2 ">
            <Button />
          </div>
        </div>

        {/* Right Content - Product Image */}
        <div className="flex-1 flex justify-end items-center relative">
          {/* Badge */}
          <div className="absolute top-0 right-16 bg-white rounded-2xl shadow-lg px-6 py-4 z-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">20+</div>
              <div className="text-sm text-gray-500">Bag Type</div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
          </div>

          {/* Shopping Bags Placeholder */}
          <div className="relative w-[32rem] h-[28rem] flex items-center justify-center">
            {/* Since we can't access the imported image, I'll create a visual representation */}
            <div className="relative">
              {/* Main bag - Larger */}
              <div className="w-72 h-80 bg-gradient-to-b from-red-100 to-red-200 rounded-xl shadow-xl transform rotate-6">
                <div className="w-full h-12 bg-red-300 rounded-t-xl"></div>
                <div className="flex justify-center pt-6">
                  <div className="w-24 h-6 bg-red-400 rounded-full"></div>
                </div>
                <div className="absolute top-3 right-3 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transform -rotate-12">
                  <div className="w-6 h-1.5 bg-white rounded"></div>
                  <div className="w-1.5 h-6 bg-white rounded absolute"></div>
                </div>
              </div>

              {/* Secondary bag - Larger */}
              <div className="absolute -left-12 top-12 w-56 h-72 bg-gradient-to-b from-orange-100 to-orange-200 rounded-xl shadow-lg transform -rotate-12">
                <div className="w-full h-10 bg-orange-300 rounded-t-xl"></div>
                <div className="flex justify-center pt-5">
                  <div className="w-18 h-5 bg-orange-400 rounded-full"></div>
                </div>
              </div>

              {/* Third bag - Larger */}
              <div className="absolute -right-8 top-16 w-52 h-68 bg-gradient-to-b from-red-50 to-red-100 rounded-xl shadow-md transform rotate-12">
                <div className="w-full h-9 bg-red-200 rounded-t-xl"></div>
                <div className="flex justify-center pt-4">
                  <div className="w-16 h-4 bg-red-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
