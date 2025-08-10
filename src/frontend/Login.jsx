import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // <-- Tambahkan ini

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // <-- Hook untuk navigasi

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", form);

    // Simulasi login berhasil (bisa diganti validasi real ke server)
    if (form.email === "admin@example.com" && form.password === "admin123") {
      navigate("/Admin"); // <-- Redirect ke halaman admin
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-red-600 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-black font-semibold py-2 rounded-lg transition duration-300"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Belum punya akun? <a href="#" className="text-rose-500 hover:underline">Daftar</a>
        </p>
      </Motion.div>
    </div>
  );
};

export default LoginPage;