import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../frontend/navbar.jsx";
import Gambar from "../frontend/gambar.jsx";
import About from "../frontend/about.jsx";
import Services from "../frontend/Services.jsx";
import Contact from "../frontend/contact.jsx";



const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gambar />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path ="/contact" element={<Contact/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
