import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Admin-frontend/Dashboad.jsx";
import LoginPage from "./Admin-frontend/Login.jsx";
import Home from "./frontend/home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman login */}
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/" element={<Home />} /> */}

        {/* Route untuk dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
