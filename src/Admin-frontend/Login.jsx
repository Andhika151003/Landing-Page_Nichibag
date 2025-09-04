import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LoginPage = () => {
  // ===== PERBAIKAN: Pindahkan pemanggilan hook ke dalam komponen =====
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data yang akan dikirim ke server:", form);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);

      await MySwal.fire({
        title: "Login Berhasil 🎉",
        text: res.data.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/Dashboard");
    } catch (err) {
      MySwal.fire({
        title: "Login Gagal ❌",
        text: err.response?.data?.message || "Terjadi kesalahan pada server",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
      console.error("Error dari Axios:", err);
    }
  };

  return (
    // ===== PERBAIKAN: Hapus div yang tidak perlu dan tambahkan gaya dark mode langsung =====
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-800 dark:to-gray-900">
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 mx-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-300" size={20} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 dark:text-gray-300" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Masuk
          </button>
        </form>
      </Motion.div>
    </div>
  );
};

export default LoginPage;