import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../frontend/navbar.jsx";
import Home from "../frontend/home.jsx";
import About from "../frontend/about.jsx";
import Services from "../frontend/Services.jsx";
import Contact from "../frontend/contact.jsx";
import LoginPage from "../Admin-frontend/Login.jsx";
import Dashboard from "../Admin-frontend/Dashboad.jsx";
import KelolaKoleksi from "../Admin-frontend/KelolaKoleksi.jsx";
import KelolaProduk from "../Admin-frontend/Product.jsx";
import AboutAdmin from "../Admin-frontend/AboutAdmin.jsx";
import ManageServices from "../Admin-frontend/ManageServices.jsx";

const AppContent = () => {
  const location = useLocation();

  // Semua path admin yang tidak butuh navbar
  const adminPaths = [
    "/Admin",
    "/Dashboard",
    "/kelola-koleksi",
    "/kelola-produk",
    "/kelola-about",
    "/kelola-contact",
  ];

  // Cek apakah path sekarang ada di daftar adminPaths
  const hideNavbar = adminPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Halaman Admin */}
        <Route path="/Admin" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/kelola-koleksi" element={<KelolaKoleksi />} />
        <Route path="/kelola-produk" element={<KelolaProduk />} />
        <Route path="/kelola-about" element={<AboutAdmin />} />
        <Route path="/kelola-contact" element={<ManageServices />} />

        {/* Halaman User */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRouter;
