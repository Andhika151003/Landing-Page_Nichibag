import React from "react";
import Gambar from "../assets/produk.png";
import Button from "../components/ModernButton";
import { motion as Motion } from "framer-motion";

// VARIAN ANIMASI BARU
// Kita akan membuat container untuk setiap seksi
// dan menganimasikan elemen di dalamnya secara berurutan
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Memberi jeda 0.2 detik antar-animasi anak
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const About = () => {
  const nilaiNilai = [
    { title: "Berkualitas", desc: "Kemasan Berkualitas Dan Berbahan Premium", icon: "🌟" },
    { title: "Inovasi", desc: "Selalu Menciptakan Produk Unggul", icon: "💡" },
    { title: "Ramah Lingkungan", desc: "Pilihan Terbaik Mengurangi Limbah Plastik", icon: "🌿" },
    { title: "Terpercaya", desc: "Memberikan Layanan Yang Terbaik", icon: "🤝" },
  ];

  const timelineItems = [
    { year: "2022", title: "Didirikan", desc: "Nichibag resmi berdiri pada tahun 2022 yang berada di kota Surabaya" },
    { year: "2023", title: "Berkembang", desc: "Memperluas jangkauan dan Pasar Produk dengan mengembangkan produk - produk yang inovatif" },
    { year: "2024", title: "Inovasi Digital", desc: "Mengembangkan platform digital" },
    { year: "2025", title: "Go Global", desc: "Menembus pasar internasional" },
  ];

  return (
    <div className="pt-20 overflow-x-hidden">
      
      {/* Kita bungkus semua seksi dalam satu container animasi */}
      <Motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <Motion.section variants={itemVariants} className="text-white text-center py-20 bg-red-800">
          <h1 className="text-4xl font-semibold text-center leading-normal tracking-tight">NICHIBAG.ID</h1>
          <p className="text-lg">Bukan Sekadar Tas, Ini Identitas</p>
        </Motion.section>

        {/* Siapa Kami */}
        <Motion.section variants={itemVariants} className="bg-[#F9F6EE] flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-20 py-16">
          <div className="md:w-1/2">
            <h2 className="text-2xl text-black font-semibold mb-4">Siapa Kami</h2>
            <p className="text-black mb-4">
              Didirikan sejak tahun 2022, Nichibag.id hadir sebagai solusi kemasan modern yang mengutamakan kualitas, estetika, dan kepedulian terhadap lingkungan.
            </p>
            <p className="text-blue-600 font-semibold text-lg">500K+ Klien yang puas</p>
          </div>
          <div className="md:w-1/2">
            <img src={Gambar} alt="Tentang Kami" className="rounded-lg shadow-lg w-full" />
          </div>
        </Motion.section>

        {/* Visi Misi */}
        <Motion.section variants={itemVariants} className="bg-red-800 py-16 px-6 md:px-20">
          <h2 className="text-2xl font-semibold mb-8 text-center text-white">Visi & Misi</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-[#F9F6EE] p-6 rounded-lg shadow-md w-full">
              <h3 className="text-lg font-semibold text-red-700 mb-2">Visi</h3>
              <p className="text-gray-700 leading-relaxed">
                Mengubah cara bisnis melihat kemasan dari sekadar pembungkus menjadi media cerita, identitas, dan keberlanjutan.
              </p>
            </div>
            <div className="bg-[#F9F6EE] p-6 rounded-lg shadow-md w-full">
              <h3 className="text-lg font-semibold text-red-700 mb-2">Misi</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Membuat kemasan yang tidak hanya indah, tapi juga berdampak baik untuk lingkungan dan masyarakat.</li>
                <li>Menyediakan solusi packaging yang fleksibel dan personal bagi brand lokal maupun global.</li>
                <li>Menjadi pelopor dalam penggunaan bahan daur ulang dan proses produksi beretika.</li>
                <li>Berkolaborasi dengan klien sebagai partner, bukan hanya vendor.</li>
              </ul>
            </div>
          </div>
        </Motion.section>
        
        {/* Nilai-Nilai */}
        <Motion.section variants={itemVariants} className="py-20 px-6 md:px-20 bg-[#F9F6EE]">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#800000]">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {nilaiNilai.map((item) => (
              <div key={item.title} className="p-6 bg-red-800 rounded-2xl shadow-md flex flex-col items-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white">{item.desc}</p>
              </div>
            ))}
          </div>
        </Motion.section>

        {/* Perjalanan Kami (Timeline) */}
        <Motion.section variants={itemVariants} className="bg-red-800 py-16 px-6 md:px-20">
          <h2 className="text-2xl font-semibold mb-12 text-center text-white">Perjalanan Kami</h2>
          <div className="relative flex flex-col items-center">
            <div className="absolute w-1 bg-[#F9F6EE] h-full left-1/2 transform -translate-x-1/2 z-0" />
            {timelineItems.map((item, i) => (
              <div key={item.year} className={`w-full md:w-1/2 px-4 py-6 relative z-10 ${i % 2 === 0 ? "md:pr-16 md:self-start" : "md:pl-16 md:self-end"}`}>
                <div className="bg-[#F9F6EE] p-6 rounded-lg shadow-lg">
                  <p className="text-red-800 font-bold text-lg mb-1">{item.year}</p>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
                <span className="absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#F9F6EE] border-4 border-red-800 rounded-full z-20" />
              </div>
            ))}
          </div>
        </Motion.section>

        {/* CTA */}
        <Motion.section variants={itemVariants} className="text-black text-center py-12 px-6 bg-[#F9F6EE]">
          <h2 className="text-2xl font-bold mb-4">Siap Berkolaborasi dengan Kami?</h2>
          <p className="mb-6">Hubungi kami untuk berdiskusi lebih lanjut tentang kemasan Anda.</p>
          <div className="flex justify-center mt-6">
            <a href="https://wa.me/6287788261298" target="_blank" rel="noopener noreferrer">
              <Button text="Kontak Kami" />
            </a>
          </div>
        </Motion.section>
      </Motion.div>
    </div>
  );
};

export default About;