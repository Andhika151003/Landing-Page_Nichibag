
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./frontend/navbar.jsx"; 
import Hero from "./frontend/Hero.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;
