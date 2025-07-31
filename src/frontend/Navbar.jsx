import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Collection");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ["Collection", "About", "Service", "Contact Us"];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Nichi Store" className="h-8" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActiveItem(item)}
                className={`px-3 py-1 rounded ${
                  activeItem === item
                    ? "bg-red-700 text-white"
                    : "text-black hover:text-red-700"
                } transition`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Search & Hamburger */}
        <div className="flex items-center space-x-4">
          <div className="text-black hover:text-red-700 cursor-pointer">
            <Search size={18} />
          </div>
          {/* Hamburger Menu */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-6 py-4 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveItem(item);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded ${
                activeItem === item
                  ? "bg-red-700 text-white"
                  : "text-black hover:text-red-700"
              } transition`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar