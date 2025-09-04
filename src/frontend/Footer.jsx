// src/frontend/Footer.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faInstagram, 
  faTiktok, 
  faWhatsapp 
} from "@fortawesome/free-brands-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const menuItems = [
    { name: "Collection", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { href: "#", icon: faInstagram, label: "Instagram" },
    { href: "#", icon: faTiktok, label: "TikTok" },
    { href: "#", icon: faWhatsapp, label: "WhatsApp" },
    { href: "#", icon: faStore, label: "Shopee" },
    { href: "#", icon: faStore, label: "Tokopedia" },
  ];

  return (
    <footer className="bg-red-800 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold text-amber-50 mb-4">Nichibag.id</h2>
            <p className="text-sm text-white">
              Solusi kemasan modern yang mengutamakan kualitas, estetika, dan kepedulian terhadap lingkungan.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-50">Quick Links</h3>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href={item.path} className="text-blue-100 hover:text-yellow-200 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Hubungi Kami */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-100">Hubungi Kami</h3>
            <ul className="space-y-3 text-white">
                <li>info@nichibag.id</li>
                <li>+62 812 3456 7890</li>
                <li>Surabaya, Indonesia</li>
            </ul>
          </div>

          {/* Kolom 4: Follow Us */}
          <div>
             <h3 className="font-bold text-lg mb-4 text-blue-100">Follow Us</h3>
             {/* 👇 BAGIAN INI YANG DIPERBARUI */}
             <div className="flex flex-wrap gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex flex-col items-center gap-2 text-white hover:text-yellow-200 transition-all duration-300 transform hover:scale-110 w-16"
                >
                  <FontAwesomeIcon icon={social.icon} className="h-6 w-6" />
                  <span className="text-xs font-semibold">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-white">
          <p>© {new Date().getFullYear()} Nichibag.id. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;