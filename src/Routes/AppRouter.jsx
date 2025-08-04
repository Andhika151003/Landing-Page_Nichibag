import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../frontend/navbar.jsx";
import Gambar from "../frontend/gambar.jsx";
import About from "../frontend/about.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gambar />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
