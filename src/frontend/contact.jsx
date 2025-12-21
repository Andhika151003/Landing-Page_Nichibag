import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion as Motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", 
    subject: "Tanya Produk", // Nilai default untuk dropdown
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // NOMOR HP TUJUAN (ganti dengan nomormu, awali dengan 62)
    const phoneNumber = "6287788261298"; 

    // ===== FORMAT PESAN BARU DENGAN TOPIK SPESIFIK =====
    const whatsappMessage = `
Hai Nichibag! 👋😄  
Semoga tim Nichibag lagi sehat dan happy ya ✨🌈  

Aku suka banget sama produk kalian, tapi aku ada sedikit hal yang mau aku tanyain nih 👇
━━━━━━━━━━━━━━━
*Perihal:* ${formData.subject}
*Nama:* ${formData.firstName} ${formData.lastName}
*Pesan:*
${formData.message}
━━━━━━━━━━━━━━━
Makasih banyak ya Min 🙏💕  
Ditunggu balasannya, semoga Nichibag makin kece terus! 🚀🔥

_(Pesan ini otomatis terkirim dari formulir nichibag.id)_
    `.trim();
    // =======================================================

    // Buat URL WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Buka WhatsApp di tab baru
    window.open(whatsappURL, "_blank");
  };

  return (
    <section
      className="min-h-screen w-full bg-[#F9F6EE] text-gray-800 px-4 md:px-8 flex items-center justify-center"
      id="contact"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <Motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-red-700">
            Hubungi Kami
          </h2>
          <p className="text-red-700 text-lg">
            Kami siap membantu Anda! Silakan isi formulir atau hubungi kontak di
            bawah ini.
          </p>
          <div className="space-y-4 text-base">
            <div className="flex items-center gap-4">
              <Phone className="text-red-700" />
              <span className="text-red-700">+62 877 8826 1298</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-red-700" />
              <span className="text-red-700">nichibag.id@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-red-700" />
              <span className="text-red-700">Surabaya, Indonesia</span>
            </div>
          </div>
        </Motion.div>

        {/* Right Side */}
        <Motion.form
          onSubmit={handleSubmit}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-[#F7A5A5] text-red-700 p-8 rounded-xl shadow-lg space-y-6 w-full border-2 border-red-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Nama Depan"
              value={formData.firstName}
              onChange={handleChange}
              className="px-4 py-3 rounded-md border-2 border-red-700 bg-transparant text-red-700 placeholder-red-700 focus:outline-none focus:ring-2 focus:ring-maroon w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nama Belakang"
              value={formData.lastName}
              onChange={handleChange}
              className="px-4 py-3 rounded-md border-2 border-red-700 bg-transparant text-red-700 placeholder-red-700 focus:outline-none focus:ring-2 focus:ring-maroon w-full"
            />
          </div>

          {/* ===== DROPDOWN TOPIK BARU ===== */}
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border-2 border-red-700 bg-transparant text-red-700 focus:outline-none focus:ring-2 focus:ring-maroon"
            required
          >
            <option>Tanya Produk</option>
            <option>Keluhan/Komplain</option>
            <option>Peluang Kerjasama</option>
            <option>Lainnya</option>
          </select>
          {/* ============================== */}

          <textarea
            rows="5"
            name="message"
            placeholder="Tulis pesan Anda di sini..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border-2 border-red-700 bg-transparant text-red-700 placeholder-red-700 focus:outline-none focus:ring-2 focus:ring-maroon"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-transparant border-2 border-red-700 hover:bg-[#f8d7d0] text-red-700 py-3 rounded-md font-semibold hover:bg-maroon/90 transition flex items-center justify-center gap-2"
          >
            Kirim via WhatsApp <Send size={18} />
          </button>
        </Motion.form>
      </div>
    </section>
  );
};

export default ContactUs;