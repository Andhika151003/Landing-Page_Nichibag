import React from "react";
import Gambar from "../assets/produk.png";
import { motion as Motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="pt-6">
      {/* Header atas */}
      <Motion.section
        style={{ backgroundColor: "#800000" }}
        className="text-white text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-4">Nichi ID</h1>
        <p className="text-lg">Bukan Sekadar Tas, Ini Identitas</p>
      </Motion.section>

      {/* Siapa Kami */}
      <Motion.section
        className="bg-white flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-20 py-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.9}}
      >
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Siapa Kami</h2>
          <p className="text-black mb-4">
            Didirikan sejak tahun 2022, Nichi Bag hadir sebagai solusi kemasan modern yang mengutamakan kualitas, estetika, dan kepedulian terhadap lingkungan. Kami fokus menyediakan paperbag dan kemasan berbahan dasar ramah lingkungan yang tidak hanya fungsional, tetapi juga meningkatkan citra produk Anda.
          </p>
          <p className="text-blue-600 font-semibold text-lg">500+ Klien yang puas</p>
        </div>
        <Motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay:0.2 }}
        >
          <img
            src={Gambar}
            alt="Tentang Kami"
            className="rounded-lg shadow-lg"
          />
        </Motion.div>
      </Motion.section>

      {/* Visi & Misi */}
      <Motion.section
        className="bg-red-800 py-16 px-6 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-semibold mb-8 text-center text-white">Visi & Misi</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <Motion.div
            className="bg-white p-6 rounded-lg shadow-md w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-red-700 mb-2">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Menjadi brand kemasan terdepan di Indonesia...
            </p>
          </Motion.div>
          <Motion.div
            className="bg-white p-6 rounded-lg shadow-md w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-red-700 mb-2">Misi</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Inovatif, Responsif, dan Siap Tumbuh</li>
              <li>Dukung Gerakan Ramah Lingkungan</li>
              <li>Menjadi Partner Branding</li>
            </ul>
          </Motion.div>
        </div>
      </Motion.section>

      {/* Nilai-Nilai Kami */}
      <Motion.section
        className="py-20 px-6 md:px-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#800000]">Nilai-Nilai Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Berkualitas", desc: "Kemasan Berkualitas...", icon: "🎯" },
            { title: "Inovasi", desc: "Selalu berusaha menciptakan...", icon: "💡" },
            { title: "Ramah Lingkungan", desc: "Ramah Lingkungan...", icon: "🌱" },
            { title: "Terpercaya", desc: "Memberikan layanan...", icon: "🤝" },
          ].map((item, i) => (
            <Motion.div
              key={i}
              className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#800000] mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* Timeline */}
      <Motion.section
        className="bg-red-800 py-16 px-6 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-semibold mb-12 text-center text-white">Perjalanan Kami</h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-1 bg-white h-full left-1/2 transform -translate-x-1/2 z-0" />
          {[
            {
              year: "2022",
              title: "Didirikan",
              desc: "Nichi Bag resmi berdiri pada tahun 2022",
            },
            {
              year: "2023",
              title: "Berkembang",
              desc: "Memperluas jangkauan dan Pasar Produk",
            },
            {
              year: "2024",
              title: "Inovasi Digital",
              desc: "Mengembangkan platform digital untuk kemudahan akses",
            },
            {
              year: "2025",
              title: "Go Global",
              desc: "Mulai menembus pasar Profesional dan Internasional",
            },
          ].map((item, i) => (
            <Motion.div
              key={item.year}
              className={`w-full md:w-1/2 px-4 py-6 relative z-10 ${
                i % 2 === 0 ? "md:pr-16 md:self-start" : "md:pl-16 md:self-end"
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-red-800 font-bold text-lg mb-1">{item.year}</p>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-700">{item.desc}</p>
              </div>
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-red-800 rounded-full z-20" />
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* Call to Action */}
      <Motion.section
        style={{ backgroundColor: "white" }}
        className="text-black text-center py-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Siap Berkolaborasi dengan Kami?</h2>
        <p className="mb-6">Hubungi kami untuk berdiskusi lebih lanjut tentang kemasan Anda.</p>
        <div className="space-x-4">
          <a
            href="https://wa.me/628973809698"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-300 text-white font-semibold px-6 py-2 rounded hover:bg-black transition"
          >
            Kontak Kami
          </a>
        </div>
      </Motion.section>
    </div>
  );
};

export default About;
