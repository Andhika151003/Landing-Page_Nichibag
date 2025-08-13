import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion as Motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ContactUs = () => {
  return (
    <section
      className="min-h-screen w-full bg-[#F9F6EE] text-gray-800 px-4 md:px-8 flex items-center justify-center"
      id="contact"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-maroon">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 text-lg">
            Kami siap membantu Anda! Silakan isi formulir atau hubungi kontak di
            bawah ini.
          </p>

          <div className="space-y-4 text-base">
            <div className="flex items-center gap-4">
              <Phone className="text-maroon" />
              <span>+62 812 3456 7890</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-maroon" />
              <span>info@nichi.id</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-maroon" />
              <span>Surabaya, Indonesia</span>
            </div>
          </div>
        </Motion.div>

        {/* Right Side */}
        <Motion.form
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-red-800 text-white p-8 rounded-xl shadow-lg space-y-6 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Depan"
              className="px-4 py-3 rounded-md border border-gray-500 bg-red-800 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-maroon w-full"
              required
            />
            <input
              type="text"
              placeholder="Nama Belakang"
              className="px-4 py-3 rounded-md border border-gray-500 bg-red-800 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-maroon w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-gray-500 bg-red-800 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-maroon"
            required
          />
          <textarea
            rows="5"
            placeholder="Pesan Anda"
            className="w-full px-4 py-3 rounded-md border border-gray-500 bg-red-800 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-maroon"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-maroon text-red-700 py-3 rounded-md font-semibold hover:bg-maroon/90 transition"
          >
            Kirim Pesan
          </button>
        </Motion.form>
      </div>
    </section>
  );
};

export default ContactUs;
