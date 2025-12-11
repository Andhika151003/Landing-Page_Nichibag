// src/frontend/Services.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion as Motion } from "framer-motion";
import Button from "../components/ButtonServices.jsx";
import Layananjadi from "../assets/Layananjadi.png";
import LayananCustom from "../assets/LayananCustom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Varian animasi yang konsisten
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeInOut",
    },
  }),
};

// Data Layanan statis (sebelumnya bernama 'steps')
const servicesData = [
  {
    icon: "🧠",
    title: "Berpengalaman",
    desc: "Didukung oleh pengalaman sejak 2022, kami memahami kebutuhan desain kemasan yang tepat untuk setiap brand.",
  },
  {
    icon: "🎨",
    title: "Desain Eksklusif",
    desc: "Pilih dari koleksi kemasan premium yang dirancang dengan estetika dan fungsionalitas tinggi.",
  },
  {
    icon: "⚡",
    title: "Cepat",
    desc: "Proses pengerjaan dan pengiriman yang efisien memastikan pesanan Anda tiba tepat waktu tanpa mengorbankan kualitas.",
  },
];

const Services = () => {
  const [pageData, setPageData] = useState({
    cards: [{}, {}, {}],
    whatsappUrl: "",
    googleMapsUrl: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/service");
        if (res.data && typeof res.data === "object") {
          setPageData(res.data);
        } else {
          console.error(
            "Data yang diterima dari server tidak valid:",
            res.data
          );
        }
      } catch (error) {
        console.error("Gagal memuat data halaman layanan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white text-black">
      {/* HERO */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-[#5C1717] to-[#99666E]">
        <h1 className="text-2xl md:text-xl font-bold mb-4 py-10 text-white">
          {/* PERBAIKAN: Menggunakan teks langsung karena komponen HeroTitle tidak ada */}
          Temukan Solusi Kemasan Terbaik untuk Brand Anda
        </h1>
        <Motion.p
          className="max-w-2xl mx-auto mb-6 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={1}
        >
          Kemasan bukan sekadar pembungkus — ia adalah pesan pertama dari sebuah
          brand. Di Nichibag.id, kami hadir untuk membantu Anda membungkus
          cerita dengan cara yang elegan dan bermakna.
        </Motion.p>
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={2}
        >
          <a href="#layanan" className="py-2 px-6 inline-block">
            <Button />
          </a>
        </Motion.div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-4 md:px-16 bg-[#F9F6EE] text-black">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Nichibag.id</h2>
          <p className="max-w-xl mx-auto">
            Beragam Pilihan Layanan Kemasan untuk Bisnis Anda
            <br />
            Kami menawarkan berbagai jenis kemasan premium yang dikemas secara
            profesional. Dengan desain menarik, kualitas terbaik, dan
            fleksibilitas produksi, Nichibag.id siap mendukung bisnis Anda
            tampil menonjol di setiap kesempatan.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* PERBAIKAN: Menggunakan variabel 'servicesData' yang sudah didefinisikan */}
          {servicesData.map((s, i) => (
            <Motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 bg-red-800 text-white/90"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p>{s.desc}</p>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="layanan" className="py-20 px-4 md:px-16 bg-red-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Layanan Kami</h2>
          <p className="text-white max-w-xl mx-auto">
            Menerima Segala Jenis Kemasan Sesuai Kebutuhan Anda
          </p>
        </div>

        {/* === Layanan Produk Langsung Jadi === */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <Motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center bg-[#F9F6EE] p-4 rounded-lg backdrop-blur-sm"
            >
              <img
                src={Layananjadi}
                alt="Produk Jadi"
                className="w-full rounded-lg shadow-sm mb-4 h-48 object-cover border-4 border-red-700"
              />
              <h3 className="text-lg font-semibold mb-2 text-red-700">
                Kemasan Siap Pakai Premium
              </h3>
              <p className="text-red-700 text-sm">
                Pilihan kemasan siap digunakan untuk kebutuhan bisnis Anda tanpa
                menunggu proses custom.
              </p>
            </Motion.div>
            {/* Card 2 */}
            <Motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center bg-[#F9F6EE] p-4 rounded-lg backdrop-blur-sm"
            >
              <img
                src={LayananCustom}
                alt="Layanan Custom"
                className="w-full rounded-lg shadow-sm mb-4 h-48 object-cover border-4 border-red-700"
              />
              <h3 className="text-lg font-semibold mb-2 text-red-700">
                Layanan Custom
              </h3>
              <p className="text-red-700 text-sm">
                Pilihan kemasan siap digunakan untuk kebutuhan bisnis Anda tanpa
                menunggu proses custom.
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* CTA & MAP */}
      <section className="w-full bg-[#F9F6EE] py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
              Siap Membuat Sesuatu yang Spesial?
            </h2>
            <p className="text-gray-600 max-w-md mb-6 mx-auto md:mx-0">
              Hubungi kami hari ini untuk mendiskusikan kebutuhan kemasan Anda
              dan biarkan kami membantu menciptakan pengalaman yang berkesan.
            </p>
            <a
              href={pageData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// PERBAIKAN UTAMA: Nama komponen yang diekspor disamakan menjadi 'Services'
export default Services;
