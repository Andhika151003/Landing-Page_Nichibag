import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "../frontend/Login.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
