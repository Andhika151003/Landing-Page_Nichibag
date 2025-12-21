// about.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Gambar from "../assets/produk.png";
import GambarFitnesWork from "../assets/gym.png";
import GambarUfume from "../assets/ufume.png";
import GambarbataviaClinic from "../assets/bataviaClinic.png";
import GambarTomolap from "../assets/tomolap.png";
import Button from "../components/ModernButton";
import {
  motion as Motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

// Variabel animasi fade-in
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Data timeline
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

// 🔽 DATA CARD PRODUK (bisa kamu ganti sesuai gambar & nama produk)
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

  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 40, stiffness: 400 });
  const scaleOnScroll = useTransform(scrollVelocity, [0, 1000], [1, 1.05]);
  const opacityOnScroll = useTransform(scrollVelocity, [0, 500], [1, 0.9]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/about")
      .then((res) => {
        if (res.data) setAboutData(res.data);
      })
      .catch((err) => console.error("Gagal mengambil data about:", err));
  }, []);

  return (
    <div className="pt-6 overflow-x-hidden">
      {/* Header */}
      <Motion.section
        className="text-red-700 text-center pt-28 pb-20 bg-[#f8d7d0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Motion.h1
          className="text-4xl font-semibold text-center tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          NICHIBAG.ID
        </Motion.h1>
        <p className="text-lg text-red-700">Bukan Sekadar Tas, Ini Identitas</p>
      </Motion.section>

      {/* Siapa Kami */}
      <Motion.section
        className="bg-[#F9F6EE] flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-20 py-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <h2 className="text-2xl text-red-700 font-semibold mb-4">
            Siapa Kami
          </h2>
          <p className="text-red-700 mb-4">
            Didirikan sejak tahun 2022, Nichibag.id hadir sebagai solusi kemasan
            modern yang mengutamakan kualitas, estetika, dan kepedulian terhadap
            lingkungan.
          </p>
          <p className="text-red-500 font-semibold text-lg">
            500K+ Klien yang puas
          </p>
        </div>
        <Motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ scale: scaleOnScroll }}
        >
          <img
            src={
              aboutData.imageUrl
                ? `http://127.0.0.1:5000${aboutData.imageUrl}`
                : Gambar
            }
            alt="Tentang Kami"
            className="rounded-lg shadow-lg"
          />
        </Motion.div>
      </Motion.section>

      {/* 🔽 BAGIAN BARU: CARD PRODUK */}
      <Motion.section
        className="bg-[#F9F6EE] py-12 px-4 md:px-25"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-center text-red-700 mb-10">
          Kami Pernah Bekerja Sama Dengan
        </h2>

        {/* ==================================================
          KODE DIPERBAIKI MULAI DARI SINI
          Kita tambahkan lagi grid container dan .map()
          ==================================================
        */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center place-items-center">
          {productCards.map((item, i) => (
            <div
              key={i}
              // KELAS YANG DIHAPUS: bg-white, rounded-xl, shadow-md, overflow-hidden, hover:shadow-xl
              // KELAS YANG DITAMBAH: text-center (untuk menengahkan judul)
              className="w-[230px] text-center"
            >
              <img
                src={item.img}
                alt={item.title}
                // KELAS YANG DITAMBAH: rounded-xl (agar gambar tetap bulat) dan shadow-md (agar tetap ada bayangan)
                className="w-full h-48 object-cover rounded-xl shadow-md"
              />

              {/* Kotak abu-abu (div) dihilangkan, h3 diberi margin-top (mt-4) */}
              <h3 className="text-lg font-semibold text-red-800 mt-4">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        {/* ================================================
            KODE DIPERBAIKI SAMPAI SINI
        ================================================= */}
      </Motion.section>

      {/* Timeline */}
      <Motion.section
        className="bg-[#f8d7d0] py-16 px-6 md:px-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold mb-12 text-center text-red-700">
          Perjalanan Kami
        </h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-1 bg-[#F9F6EE] h-full left-1/2 transform -translate-x-1/2 z-0" />
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
                <h4 className="text-red-700 font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-red-700">{item.desc}</p>
              </div>
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#F9F6EE] border-4 border-red-800 rounded-full z-20" />
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* CTA */}
      <Motion.section
        className="text-red-700 text-center py-12 px-6 bg-[#F9F6EE]"
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
            href="https://wa.me/6287788261298"
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
