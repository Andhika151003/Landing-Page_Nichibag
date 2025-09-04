// src/frontend/Services.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion as Motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import HeroTitle from "../components/HeroTitle.jsx";
import Button from "../components/ButtonServices.jsx";

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// PERBAIKAN: Nama komponen disamakan menjadi 'Services'
const Services = () => {
  const [pageData, setPageData] = useState({ cards: [{},{},{}], whatsappUrl: '', googleMapsUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/service");
        // Memastikan data yang diterima adalah objek yang valid sebelum di-set
        if (res.data && typeof res.data === 'object') {
          setPageData(res.data);
        } else {
          // Tetap menggunakan data awal jika respons tidak valid
          console.error("Data yang diterima dari server tidak valid:", res.data);
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
          <HeroTitle />
        </h1>
        <p className="max-w-2xl mx-auto mb-6 text-white">
          Kemasan bukan sekadar pembungkus — ia adalah pesan pertama dari sebuah brand. Di Nichibag.id, kami hadir untuk membantu Anda membungkus cerita dengan cara yang elegan dan bermakna.
        </p>
        <a href="#layanan" className="py-2 px-6 inline-block">
          <Button text="Layanan Kami" />
        </a>
      </section>

      {/* LAYANAN KAMI */}
      <section id="layanan" className="py-20 px-4 md:px-16 bg-red-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Layanan Kami</h2>
          <p className="text-white max-w-xl mx-auto">
            Menerima Segala Jenis Kemasan Apapun itu
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white">Memuat layanan...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pageData.cards && pageData.cards.map((card, i) => (
              <Motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={zoomIn}
                className="text-center bg-white/10 p-4 rounded-lg backdrop-blur-sm"
              >
                <img
                  src={card.imageUrl ? `http://localhost:5000${card.imageUrl}` : 'https://via.placeholder.com/400x300'}
                  alt={card.title || 'Layanan'}
                  className="w-full rounded-lg shadow-sm mb-4 h-48 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2 text-white">{card.title || 'Judul Layanan'}</h3>
                <p className="text-white/80 text-sm">{card.description || 'Deskripsi layanan akan muncul di sini.'}</p>
              </Motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA & MAP */}
      <section className="w-full bg-[#F9F6EE] py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl text-black font-bold mb-4">
              Siap Membuat Sesuatu yang Spesial?
            </h2>
            <p className="text-gray-600 max-w-md mb-6 mx-auto md:mx-0">
              Hubungi kami hari ini untuk mendiskusikan kebutuhan kemasan Anda dan biarkan kami membantu menciptakan pengalaman yang berkesan.
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

          <div className="w-full h-80 md:h-96 bg-gray-200 rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-500">Memuat Peta...</div>
            ) : (
              <iframe
                src={pageData.googleMapsUrl}
                className="w-full h-full border-0" // PERBAIKAN: Kelas border-10 tidak valid
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Nichibag.id"
              ></iframe>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// PERBAIKAN: Nama komponen yang diekspor disamakan menjadi 'Services'
export default Services;