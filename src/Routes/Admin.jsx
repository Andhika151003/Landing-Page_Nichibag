import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "../Admin-frontend/Login.jsx";
import Dashboard from "../Admin-frontend/Dashboad.jsx";
import Kelolakoleksi from "../Admin-frontend/KelolaKoleksi.jsx";
import KelolaProduk from "../Admin-frontend/Product.jsx"
import AboutAdmin from "../Admin-frontend/AboutAdmin.jsx";
import ManageServices from "../Admin-frontend/ManageServices.jsx";


function App() {
  return (
    <Router>
      <Login/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/kelola-koleksi" element={<Kelolakoleksi />} />
        <Route path="/kelola-produk" element={<KelolaProduk />} />
        <Route path="/kelola-about" element={<AboutAdmin />} />
        <Route path="/kelola-contact" element={<ManageServices />} />
      </Routes>
    </Router>
  );
}

export default App;
