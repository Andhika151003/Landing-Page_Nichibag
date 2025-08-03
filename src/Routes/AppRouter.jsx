import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../frontend/navbar.jsx";
import Sidebar from "../frontend/Sidebar.jsx";


const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/about" element={<Sidebar />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
