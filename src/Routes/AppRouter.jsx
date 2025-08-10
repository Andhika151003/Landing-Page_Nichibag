import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../frontend/navbar.jsx";
import Home from "../frontend/home.jsx";
import About from "../frontend/about.jsx";
import Services from "../frontend/Services.jsx";
import Contact from "../frontend/contact.jsx";
import LoginPage from "../frontend/Login.jsx";


const AppContent = () => {
  const location = useLocation();

  // Jika sedang di /Admin, jangan tampilkan navbar
  const hideNavbar = location.pathname === "/Admin";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/Admin" element={<LoginPage />} />
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
