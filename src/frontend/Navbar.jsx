import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // tambahkan ini
import Logo from "../assets/Logo1.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // dapatkan path aktif

  const menuItems = [
    { name: "Collection", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-[#F9F6EE] shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/">
            <img src={Logo} alt="Nichibag" className="h-16 w-auto" />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={`group/button relative inline-flex items-center justify-center overflow-hidden 
    rounded-md px-5 py-2 text-base font-semibold transition-all duration-300 ease-in-out 
    hover:scale-110 hover:shadow-xl ${
      location.pathname.startsWith(item.path)
        ? "bg-red-800 text-red-700"
        : "bg-[#800000] text-red-700"
    }`}
              >
                <span>{item.name}</span>
                <div
                  className="absolute inset-0 flex h-full w-full justify-center 
      [transform:skew(-13deg)_translateX(-100%)] 
      group-hover/button:duration-1000 
      group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                >
                  <div className="relative h-full w-10 bg-red-800"></div>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* Search & Hamburger */}
        <div className="flex items-center space-x-4">
          
          </div>
          {/* Hamburger Menu */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F9F6EE] shadow-md border-t border-gray-200 px-6 py-4 space-y-3">
          {menuItems.map((item) => (
           <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={`group/button relative inline-flex items-center justify-center overflow-hidden 
    rounded-md px-5 py-2 text-base font-semibold transition-all duration-300 ease-in-out 
    hover:scale-110 hover:shadow-xl ${
      location.pathname.startsWith(item.path)
        ? "bg-red-800 text-red-600"
        : "bg-[#800000] text-red-600"
    }`}
              >
                <span>{item.name}</span>
                <div
                  className="absolute inset-0 flex h-full w-full justify-center 
      [transform:skew(-13deg)_translateX(-100%)] 
      group-hover/button:duration-1000 
      group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                >
                  <div className="relative h-full w-10 bg-red-800"></div>
                </div>
              </button>
            </li>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
