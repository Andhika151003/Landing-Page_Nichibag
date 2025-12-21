import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ link = '/katalog' }) => {
  const navigate = useNavigate();
  const isExternal = link.startsWith('http');

  const handleClick = () => {
    if (isExternal) {
      // Buka link eksternal di tab baru
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      // Gunakan navigate untuk link internal
      navigate(link);
    }
  };

  return (
    <button onClick={handleClick} className="cursor-pointer group relative bg-[#f8d7d0] hover:bg-red-300 text-red-700 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12 border-2 border-red-700">
      <div className="relative flex items-center justify-center gap-2">
        <span className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            Order Now
          </span>
          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            Let's Go!
          </span>
        </span>
        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" viewBox="0 0 24 24">
          <circle fill="currentColor" r={11} cy={12} cx={12} />
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="white" d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5" />
        </svg>
      </div>
    </button>
  );
}

export default Button;