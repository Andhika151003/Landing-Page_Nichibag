// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Komponen Layout
import AdminLayout from "./Admin-frontend/AdminLayout.jsx";

// Komponen Halaman User
import Navbar from "./frontend/Navbar.jsx";
import Footer from "./frontend/Footer.jsx";
import Home from "./frontend/home.jsx";
import About from "./frontend/about.jsx";
import Services from "./frontend/Services.jsx";
import Contact from "./frontend/contact.jsx";
import Katalog from "./frontend/Katalog.jsx";
import ProductDetail from "./frontend/ProdukDetail.jsx";

// Komponen Halaman Admin
import LoginPage from "./Admin-frontend/Login.jsx";
import Dashboard from "./Admin-frontend/Dashboad.jsx";
import KelolaHome from "./Admin-frontend/KelolaHome.jsx";
import KelolaProduk from "./Admin-frontend/Product.jsx";
import AboutAdmin from "./Admin-frontend/AboutAdmin.jsx";
import ManageServices from "./Admin-frontend/ManageServices.jsx";

// Wrapper untuk Halaman User
const UserPages = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Login Admin (Tanpa Layout) */}
        <Route path="/Admin" element={<LoginPage />} />

        {/* Halaman Admin (Menggunakan AdminLayout) */}
        <Route path="/Dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/kelola-home" element={<AdminLayout><KelolaHome /></AdminLayout>} />
        <Route path="/kelola-produk" element={<AdminLayout><KelolaProduk /></AdminLayout>} />
        <Route path="/kelola-services" element={<AdminLayout><ManageServices /></AdminLayout>} />
        <Route path="/kelola-about" element={<AdminLayout><AboutAdmin /></AdminLayout>} />

        {/* Halaman User (Menggunakan Layout User) */}
        <Route path="/" element={<UserPages><Home /></UserPages>} />
        <Route path="/about" element={<UserPages><About /></UserPages>} />
        <Route path="/services" element={<UserPages><Services /></UserPages>} />
        <Route path="/contact" element={<UserPages><Contact /></UserPages>} />
        <Route path="/katalog" element={<UserPages><Katalog /></UserPages>} />
        <Route path="/product/:id" element={<UserPages><ProductDetail /></UserPages>} />
      </Routes>
    </Router>
  );
};

export default App;