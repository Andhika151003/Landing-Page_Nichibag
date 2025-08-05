import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // tambahkan ini
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // dapatkan path aktif

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
          <img src={Logo} alt="Nichi Store" className="h-8" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`px-3 py-1 rounded ${
                  location.pathname === item.path
                    ? "bg-red-700 text-white"
                    : "text-black hover:text-red-700"
                } transition`}
              >
                {item.name}
              </Link>
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
        <div className="md:hidden bg-[#F9F6EE] shadow-md border-t border-gray-200 px-6 py-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full text-left px-3 py-2 rounded ${
                location.pathname === item.path
                  ? "bg-red-700 text-white"
                  : "text-black hover:text-red-700"
              } transition`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
