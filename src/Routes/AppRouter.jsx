import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../frontend/navbar.jsx";
import Gambar from "../frontend/gambar.jsx";
import About from "../frontend/about.jsx";
import NavbarETC from "../frontend/NavbarETC.jsx"; // Import the NavbarETC component

const AppRouter = () => {
  return (
    <Router>
      <NavbarETC />
      <Routes>
        <Route path="/" element={<Gambar />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
