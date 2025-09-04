// src/Admin-frontend/AdminLayout.jsx

import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  LayoutDashboard,
  Package,
  FileText,
  CircleUser,
  Phone,
  PanelLeft,
  Box,
  LogOut,
  Home,
} from "lucide-react";

const MySwal = withReactContent(Swal);

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Untuk menandai link aktif

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleLogout = () => {
    MySwal.fire({
      title: "Anda Yakin?", text: "Anda akan keluar dari sesi admin.",
      icon: "warning", showCancelButton: true, confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6", confirmButtonText: "Ya, logout!", cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/Admin");
      }
    });
  };

  const navItems = [
    { href: "/Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/kelola-home", icon: Home, label: "Kelola Halaman Utama" },
    { href: "/kelola-Produk", icon: Package, label: "Kelola Produk" },
    { href: "/kelola-services", icon: FileText, label: "Kelola Services" },
    { href: "/kelola-about", icon: CircleUser, label: "Kelola About" },
    
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-white border-r flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className={`h-[68px] flex items-center border-b px-4 ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
          <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
            <div className="w-8 h-8 flex items-center justify-center bg-rose-100 text-rose-700 rounded-lg">
              <Box className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-rose-700 whitespace-nowrap">AdminPanel</h2>
          </div>
          <button ref={toggleButtonRef} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            <PanelLeft className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${!isSidebarOpen && "rotate-180"}`} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-between p-4 w-full">
          <div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center py-2.5 rounded-lg transition-colors text-sm font-medium mb-2 ${
                  location.pathname === item.href
                    ? "bg-rose-100 text-rose-800"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                } ${isSidebarOpen ? "px-4" : "justify-center"}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${isSidebarOpen ? "w-full ml-3" : "w-0"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          <div>
            <button onClick={handleLogout} className={`flex items-center w-full py-2.5 rounded-lg transition-colors text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800 ${isSidebarOpen ? "px-4" : "justify-center"}`}>
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${isSidebarOpen ? "w-full ml-3" : "w-0"}`}>
                Logout
              </span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content (Konten Halaman Akan Muncul di Sini) */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;