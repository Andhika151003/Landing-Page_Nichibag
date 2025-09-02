// src/frontend/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../assets/Logo1.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Collection", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Efek shadow saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu mobile saat navigasi
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`relative text-gray-800 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-red-700 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
        location.pathname === to ? "after:scale-x-100" : ""
      }`}
    >
      {children}
    </Link>
  );

  return (
    <>
      <nav
        className={`w-full bg-white/80 backdrop-blur-md fixed top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Nichibag" className="h-16 w-auto" />
          </Link>

          {/* Menu Desktop */}
          <ul className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ))}
          </ul>

          {/* Tombol Aksi & Hamburger */}
          <div className="flex items-center gap-4">
            <button
                onClick={() => navigate('/katalog')}
                className="hidden md:block bg-red-700 text-white font-bold px-6 py-2 rounded-full hover:bg-red-800 transition-all duration-300 transform hover:scale-105"
            >
                Shop Now
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2">
              <Menu size={28} className="text-gray-800" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile (Slide-out) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Mencegah menu tertutup saat diklik di dalam area menu
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <img src={Logo} alt="Nichibag" className="h-12 w-auto" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <X size={28} className="text-gray-800" />
                </button>
            </div>
            <ul className="flex flex-col space-y-6 text-xl">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="font-semibold text-gray-800 hover:text-red-700">{item.name}</Link>
                </li>
              ))}
            </ul>
             <button
                onClick={() => navigate('/katalog')}
                className="mt-8 w-full bg-red-700 text-white font-bold px-6 py-3 rounded-full hover:bg-red-800 transition-all duration-300"
            >
                Shop Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;