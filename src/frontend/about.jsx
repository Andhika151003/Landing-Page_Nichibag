// src/frontend/about.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion as Motion } from "framer-motion";

// --- Import Assets ---
import Gambar from "../assets/produk.png";
import GambarFitnesWork from "../assets/gym.png";
import GambarUfume from "../assets/ufume.png";
import GambarbataviaClinic from "../assets/bataviaClinic.png";
import GambarTomolap from "../assets/tomolap.png";
import Button from "../components/ModernButton";

// --- KONFIGURASI ANIMASI OPTIMIZED ---
// Menggunakan transisi cubic-bezier agar gerakan terasa sangat smooth dan premium
const smoothTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1], // Kurva animasi halus (mirip iOS)
};

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 40 // Jarak sedikit lebih jauh agar gerakan naik lebih terlihat
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...smoothTransition,
      delay: i * 0.15, // Delay bertahap yang lebih rapat
    },
  }),
};

// Data Timeline
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

// Data Card Produk
const productCards = [
  { img: GambarFitnesWork, title: "Fitness Work" },
  { img: GambarUfume, title: "Ufume" },
  { img: GambarbataviaClinic, title: "Batavia Clinic" },
  { img: GambarTomolap, title: "Tomolab" },
];

const About = () => {
  const [aboutData, setAboutData] = useState({
    imageUrl: "",
    buttonUrl: "https://wa.me/628973809698",
  });

  useEffect(() => {
    // 1. SCROLL FIX: Paksa scroll ke atas saat halaman dibuka
    window.scrollTo({ top: 0, behavior: 'instant' }); // Gunakan 'instant' agar tidak ada flash scroll

    // 2. Fetch Data dari API
    axios
      .get("http://127.0.0.1:5000/api/about")
      .then((res) => {
        if (res.data) setAboutData(res.data);
      })
      .catch((err) => console.error("Gagal mengambil data about:", err));
  }, []);

  return (
    <div className="pt-6 overflow-x-hidden">
      
      {/* --- HEADER SECTION --- */}
      <section className="text-red-700 text-center pt-28 pb-20 bg-[#f8d7d0]">
        <Motion.h1
          className="text-4xl font-semibold text-center tracking-tight"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          NICHIBAG.ID
        </Motion.h1>
        <Motion.p 
          className="text-lg text-red-700 mt-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={1}
        >
          Bukan Sekadar Tas, Ini Identitas
        </Motion.p>
      </section>

      {/* --- SIAPA KAMI SECTION --- */}
      <section className="bg-[#F9F6EE] px-6 md:px-20 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Motion.div 
                className="md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }} // Animasi mulai sedikit sebelum elemen muncul penuh
                variants={fadeInUp}
            >
              <h2 className="text-2xl text-red-700 font-semibold mb-4">
                Siapa Kami
              </h2>
              <p className="text-red-700 mb-4 leading-relaxed">
                Didirikan sejak tahun 2022, Nichibag.id hadir sebagai solusi kemasan
                modern yang mengutamakan kualitas, estetika, dan kepedulian terhadap
                lingkungan.
              </p>
              <p className="text-red-500 font-semibold text-lg">
                500K+ Klien yang puas
              </p>
            </Motion.div>
            
            <Motion.div
              className="md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              custom={1}
            >
              <img
                src={
                  aboutData.imageUrl
                    ? `http://127.0.0.1:5000${aboutData.imageUrl}`
                    : Gambar
                }
                alt="Tentang Kami"
                className="rounded-lg shadow-lg w-full object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </Motion.div>
        </div>
      </section>

      {/* --- CARD PRODUK SECTION --- */}
      <section className="bg-[#F9F6EE] py-12 px-4 md:px-25">
        <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
        >
            <h2 className="text-2xl font-semibold text-center text-red-700 mb-10">
              Kami Pernah Bekerja Sama Dengan
            </h2>
        </Motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center place-items-center">
          {productCards.map((item, i) => (
            <Motion.div
              key={i}
              className="w-[230px] text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={i * 0.5} // Stagger delay lebih natural
            >
              <div className="overflow-hidden rounded-xl shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mt-4">
                {item.title}
              </h3>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="bg-[#f8d7d0] py-16 px-6 md:px-20 overflow-hidden">
        <Motion.h2 
            className="text-2xl font-semibold mb-12 text-center text-red-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
        >
          Perjalanan Kami
        </Motion.h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-1 bg-[#F9F6EE] h-full left-1/2 transform -translate-x-1/2 z-0" />
          {timelineItems.map((item, i) => (
            <Motion.div
              key={item.year}
              className={`w-full md:w-1/2 px-4 py-6 relative z-10 ${
                i % 2 === 0 ? "md:pr-16 md:self-start" : "md:pl-16 md:self-end"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              custom={0} // Reset custom agar timeline muncul per item saat di-scroll
            >
              <div className="bg-[#F9F6EE] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-red-800 font-bold text-lg mb-1">
                  {item.year}
                </p>
                <h4 className="text-red-700 font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-red-700 leading-relaxed">{item.desc}</p>
              </div>
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#F9F6EE] border-4 border-red-800 rounded-full z-20" />
            </Motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <Motion.section
        className="text-red-700 text-center py-12 px-6 bg-[#F9F6EE]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-4">
          Siap Berkolaborasi dengan Kami?
        </h2>
        <p className="mb-6">
          Hubungi kami untuk berdiskusi lebih lanjut tentang kemasan Anda.
        </p>
        <div className="flex justify-center mt-6">
          <a
            href={aboutData.buttonUrl || "https://wa.me/6287788261298"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform duration-300 hover:scale-105"
          >
              <Button text="Kontak Kami" />
          </a>
        </div>
      </Motion.section>
    </div>
  );
};

export default About;