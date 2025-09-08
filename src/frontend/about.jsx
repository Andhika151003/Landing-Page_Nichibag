// about.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Gambar from "../assets/produk.png";
import Button from "../components/ModernButton";
import {
  motion as Motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Tilt from "react-parallax-tilt";

// PERBAIKAN: Mendefinisikan varian animasi 'fadeInUp'
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// PERBAIKAN: Mendefinisikan data untuk timeline
const timelineItems = [
  {
    year: 2022,
    title: "Pendirian Nichibag.id",
    desc: "Memulai perjalanan dengan visi untuk menyediakan kemasan berkualitas.",
  },
  {
    year: 2023,
    title: "Ekspansi Produk",
    desc: "Meluncurkan berbagai jenis kemasan baru untuk memenuhi permintaan pasar.",
  },
  {
    year: 2024,
    title: "Pencapaian 500K+ Klien",
    desc: "Merayakan kepercayaan dari ratusan ribu klien di seluruh Indonesia.",
  },
  {
    year: 2025,
    title: "Go Internasional",
    desc: "Memulai perjalanan sampai seluruh dunia.",
  },
];

const About = () => {
  const [aboutData, setAboutData] = useState({
    imageUrl: "",
    buttonUrl: "https://wa.me/628973809698",
  });
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 40, stiffness: 400 });
  const scaleOnScroll = useTransform(scrollVelocity, [0, 1000], [1, 1.05]);
  const opacityOnScroll = useTransform(scrollVelocity, [0, 500], [1, 0.9]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about")
      .then((res) => {
        if (res.data) {
          setAboutData(res.data);
        }
      })
      .catch((err) => console.error("Gagal mengambil data about:", err));
  }, []);

  return (
    <div className="pt-6 overflow-x-hidden">
      {/* Header */}
      <Motion.section
        className="text-white text-center pt-28 pb-20 bg-red-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* PERBAIKAN: Mengganti SplitText dengan Motion.h1 biasa */}
        <Motion.h1
          className="text-4xl font-semibold text-center leading-[normal] align-bottom tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          NICHIBAG.ID
        </Motion.h1>
        <p className="text-lg">Bukan Sekadar Tas, Ini Identitas</p>
      </Motion.section>

      {/* Siapa Kami */}
      <Motion.section
        className="bg-[#F9F6EE] flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-20 py-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible" // Gunakan whileInView agar animasi terjadi saat di-scroll
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <h2 className="text-2xl text-black font-semibold mb-4">Siapa Kami</h2>
          <p className="text-black mb-4">
            Didirikan sejak tahun 2022, Nichibag.id hadir sebagai solusi kemasan
            modern yang mengutamakan kualitas, estetika, dan kepedulian terhadap
            lingkungan.
          </p>
          <p className="text-red-800 font-semibold text-lg">
            500K+ Klien yang puas
          </p>
        </div>
        <Motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ scale: scaleOnScroll }}
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.3}
            scale={1.02}
            transitionSpeed={1500}
          >
            <img
              src={
                aboutData.imageUrl
                  ? `http://localhost:5000${aboutData.imageUrl}`
                  : Gambar
              }
              alt="Tentang Kami"
              className="rounded-lg shadow-lg"
            />
          </Tilt>
        </Motion.div>
      </Motion.section>

      {/* Nilai-Nilai (Sudah Benar) ... */}
      <Motion.section
        className="py-20 px-6 md:px-20 bg-[#F9F6EE]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#800000]">
          Nilai-Nilai Kami
        </h2>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Bagi kami, kemasan adalah cerminan identitas. Karena itu, setiap
          produk Nichibag.id lahir dari empat pilar utama:{" "}
          <strong>Kualitas</strong> tanpa kompromi sebagai fondasi,{" "}
          <strong>Inovasi</strong> berkelanjutan untuk selalu menjadi yang
          terdepan, <strong>Kepedulian</strong> terhadap lingkungan sebagai
          tanggung jawab, dan <strong>Kepercayaan</strong> dari Anda sebagai
          tujuan akhir kami. Nilai-nilai ini bukan sekadar kata, melainkan janji
          yang kami tanamkan dalam setiap karya.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              title: "Berkualitas",
              desc: "Kemasan Berkualitas Dan Berbahan Premium",
              icon: "🌟",
            },
            {
              title: "Inovasi",
              desc: "Selalu Menciptakan Produk Unggul",
              icon: "💡",
            },
            {
              title: "Ramah Lingkungan",
              desc: "Pilihan Terbaik Mengurangi Limbah Plastik",
              icon: "🌿",
            },
            {
              title: "Terpercaya",
              desc: "Memberikan Layanan Yang Terbaik",
              icon: "🤝",
            },
          ].map((item, i) => (
            <Motion.div
              key={i}
              className="p-6 bg-red-800 rounded-2xl shadow-md flex flex-col items-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white">{item.desc}</p>
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* Perjalanan Kami (Timeline) */}
      <Motion.section
        className="bg-red-800 py-16 px-6 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-12 text-center text-white">
          Perjalanan Kami
        </h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-1 bg-[#F9F6EE] h-full left-1/2 transform -translate-x-1/2 z-0" />
          {/* PERBAIKAN: Menggunakan variabel 'timelineItems' yang sudah ada */}
          {timelineItems.map((item, i) => (
            <Motion.div
              key={item.year}
              className={`w-full md:w-1/2 px-4 py-6 relative z-10 ${
                i % 2 === 0 ? "md:pr-16 md:self-start" : "md:pl-16 md:self-end"
              }`}
              variants={fadeInUp}
            >
              <div className="bg-[#F9F6EE] p-6 rounded-lg shadow-lg">
                <p className="text-red-800 font-bold text-lg mb-1">
                  {item.year}
                </p>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-700">{item.desc}</p>
              </div>
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#F9F6EE] border-4 border-red-800 rounded-full z-20" />
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* CTA (Sudah Benar) ... */}
      <Motion.section
        className="text-black text-center py-12 px-6 bg-[#F9F6EE]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ opacity: opacityOnScroll }}
      >
        <h2 className="text-2xl font-bold mb-4">
          Siap Berkolaborasi dengan Kami?
        </h2>
        <p className="mb-6">
          Hubungi kami untuk berdiskusi lebih lanjut tentang kemasan Anda.
        </p>
        <div className="flex justify-center mt-6">
          <a
            href={aboutData.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold px-6 py-2 rounded"
          >
            <Button text="Kontak Kami" />
          </a>
        </div>
      </Motion.section>
    </div>
  );
};

export default About;
