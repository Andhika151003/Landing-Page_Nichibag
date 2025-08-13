import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { name: "Collection", path: "/" },
  { name: "About", path: "/about" },
  { name: "Service", path: "/services" },
  { name: "Contact Us", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-red-800 px-4 md:px-16 lg:px-28 py-8 w-full bottom-0 left-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">About Us</h2>
          <p className="text-white">
            Nichibag.id hadir sebagai solusi kemasan modern yang mengutamakan
            kualitas, estetika, dan kepedulian terhadap lingkungan.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Quick Links</h2>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.path} className="hover:underline text-gray-300">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-bold mb-4 text-white">Follow Us</h2>
          <ul className="flex justify-center space-x-12">
            <li className="flex flex-col items-center justify-center">
              <a href="#" className="flex flex-col items-center justify-center">
                <FontAwesomeIcon
                  icon={faTiktok}
                  className="w-12 h-12 mb-2"
                  style={{ color: "#010101" }}
                />
                <span className="text-white text-sm">TikTok</span>
              </a>
            </li>
            <li className="flex flex-col items-center justify-center">
              <a href="#" className="flex flex-col items-center justify-center">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-12 h-12 mb-2"
                  style={{ color: "#E1306C" }}
                />
                <span className="text-white text-sm">Instagram</span>
              </a>
            </li>
            <li className="flex flex-col items-center justify-center">
              <a href="#" className="flex flex-col items-center justify-center">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="w-12 h-12 mb-2"
                  style={{ color: "#E1306C" }}
                />
                <span className="text-white text-sm">Shopee</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white p-4 text-white text-center mt-6 pt-6">
        <p>© 2025 Nichibag. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
