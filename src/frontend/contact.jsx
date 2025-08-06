import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion as Motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ContactUs = () => {
  return (
    <section className="min-h-screen w-full bg-white text-gray-800 py-20 px-4 md:px-8" id="contact">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-maroon">Hubungi Kami</h2>
          <p className="text-gray-600 text-lg">
            Kami siap membantu Anda! Silakan isi formulir atau hubungi kontak di bawah ini.
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
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gray-100 p-8 rounded-xl shadow-lg space-y-6 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Depan"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon w-full"
              required
            />
            <input
              type="text"
              placeholder="Nama Belakang"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
            required
          />
          <textarea
            rows="5"
            placeholder="Pesan Anda"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-maroon"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-maroon text-white py-3 rounded-md font-semibold hover:bg-maroon/90 transition"
          >
            Kirim Pesan
          </button>
        </Motion.form>
      </div>
    </section>
  );
};

export default ContactUs;
