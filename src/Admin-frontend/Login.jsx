import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);

      // Pop-up SweetAlert kalau login berhasil
      await MySwal.fire({
        title: "Login Berhasil 🎉",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "Lanjut ke Dashboard",
      });

      navigate("/Dashboard");
    } catch (err) {
      // Pop-up kalau login gagal
      MySwal.fire({
        title: "Login Gagal ❌",
        text: err.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-red-500 rounded-2xl shadow-xl p-8 mx-4"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-black" size={20} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-black" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>

          {/* Tombol */}
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-black font-semibold py-2 rounded-lg transition duration-300"
          >
            Masuk
          </button>
        </form>
      </Motion.div>
    </div>
  );
};

export default LoginPage;
