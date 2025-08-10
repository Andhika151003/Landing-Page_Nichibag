import React from "react";
import Carousel from "../components/Carousel"; // sesuaikan path folder Anda
// import komponen lainnya...
function Home() {
  return (
    <div className="min-h-screen">
      {/* Carousel tanpa container padding */}
      <Carousel />
      
      {/* Section lainnya dengan padding */}
      <div className="px-8 py-16">
        {/* konten lainnya */}
      </div>
    </div>
  );
}
export default Home;