// src/frontend/Services.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import produk from "../assets/produk.png";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import HeroTitle from "../components/HeroTitle.jsx";
import { motion as Motion } from "framer-motion";
import Button from "../components/ButtonServices.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.3, duration: 0.4, ease: "easeOut" },
  }),
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 1) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.3, duration: 0.4, ease: "easeOut" },
  }),
};

const steps = [
  { img: produk, title: "Produk Paling Laku", desc: "Produk ini adalah produk yang paling laku dari Nichibag.id" },
  { img: hero1, title: "Kustomisasi Kemasan", desc: "Tambahkan logo, desain, atau detail sesuka hati kalian." },
  { img: hero2, title: "Template", desc: "Gunakan template kami untuk membuat kemasan yang sesuai." },
];

const LandingPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data);
      } catch (error) {
        console.error("Gagal mengambil data layanan:", error);
        // Fallback ke data default jika API gagal
        setServices([
          { _id: '1', icon: "🧠", title: "Berpengalaman", description: "Pengalaman sejak 2022." },
          { _id: '2', icon: "🎨", title: "Desain Eksklusif", description: "Pilih dari koleksi premium kami." },
          { _id: '3', icon: "⚡", title: "Cepat", description: "Proses pengerjaan dan pengiriman efisien." },
        ]);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-red-800 text-white">
      {/* HERO */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-[#5C1717] to-[#99666E]">
        <Motion.h1
          className="text-2xl md:text-xl font-bold mb-4 py-10"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <HeroTitle />
        </Motion.h1>
        <Motion.p className="max-w-2xl mx-auto mb-6 text-white" variants={fadeInUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Kemasan bukan sekadar pembungkus — ia adalah pesan pertama dari sebuah brand.
        </Motion.p>
        <Motion.a href="#layanan" className="py-2 px-6 inline-block" variants={fadeInUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Button text="Layanan Kami" />
        </Motion.a>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-4 md:px-16 bg-[#F9F6EE] text-black">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Nichibag.id</h2>
          <p className="max-w-xl mx-auto">
            Beragam Pilihan Layanan Kemasan untuk Bisnis Anda. Kami menawarkan berbagai jenis kemasan premium yang dikemas secara profesional.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Motion.div
              key={s._id} custom={i} variants={zoomIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
              <p>{s.description}</p>
            </Motion.div>
          ))}
        </div>
      </section>
      
      {/* ... sisa kode JSX Anda tidak berubah ... */}
      <section id="layanan" className="py-20 px-4 md:px-16 bg-red-800">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-white">Layanan Kami</h2>
          <p className="text-white max-w-xl mx-auto">
            Menerima Segala Jenis Kemasan Apapun itu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <Motion.div
              key={step.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={zoomIn}
              className="text-center"
            >
              <img
                src={step.img}
                alt={step.title}
                className="w-full rounded-lg shadow-sm mb-4 h-48 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-white">{step.desc}</p>
            </Motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;