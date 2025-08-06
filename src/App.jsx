import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
// import '.index.css';
import Admin from "./Routes/Admin.jsx";
import AppRouter from "./Routes/AppRouter";
import LoginPage from "../frontend/Login.jsx";

function App() {
  return (
  <Router>
<Routes>
    <LoginPage/>
   <AppRouter />;
</Routes>
  </Router>
  )
}

export default App;
