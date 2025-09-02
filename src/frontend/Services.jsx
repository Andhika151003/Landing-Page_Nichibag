// src/frontend/Services.jsx (KODE ANDA YANG SEBELUMNYA)

import React from "react";
import produk from "../assets/produk.png";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import HeroTitle from "../components/HeroTitle.jsx";
import { motion as Motion } from "framer-motion";
import Button from "../components/ButtonServices.jsx"; // <<< Tetap pakai ini
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Animasi Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// Data Layanan
const services = [
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

// Data Langkah
const steps = [
  {
    img: produk,
    title: "Produk Paling Laku",
    desc: "Produk ini adalah produk yang paling laku dari Nichibag.id",
  },
  {
    img: hero1,
    title: "Kustomisasi Kemasan",
    desc: "Tambahkan logo, desain, atau detail sesuka hati kalian untuk menciptakan kemasan yang unik dan sesuai dengan identitas brand.",
  },
  {
    img: hero2,
    title: "Template",
    desc: "Ini adalah template yang bisa kalian gunakan untuk membuat kemasan yang sesuai dengan kebutuhan bisnis kalian.",
  },
];

const ServicePage = () => {
  return (
    <div className="bg-red-800 text-white">
      {/* HERO */}
      <section className="text-center py-20 px-4 bg-gradient-to-r from-[#5C1717] to-[#99666E]">
        <Motion.h1
          className="text-2xl md:text-xl font-bold mb-4 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
        >
          <HeroTitle />
        </Motion.h1>
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
        <Motion.a
          href="#layanan"
          className="py-2 px-6 inline-block" // Anda mungkin ingin mengubah ini menjadi div jika komponen Button tidak menerima href
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={2}
        >
          <Button text="Layanan Kami" />{" "}
          {/* <<< Gunakan komponen ButtonServices */}
        </Motion.a>
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
          {services.map((s, i) => (
            <Motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={zoomIn}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300"
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

      {/* CTA & MAP */}
      <section className="w-full bg-white pt-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center pb-20 border-b border-gray-300">
          <div className="text-center md:text-left">
            <h2 className="text-2xl text-black font-bold mb-4">
              Siap Membuat Sesuatu yang Spesial?
            </h2>
            <p className="text-black max-w-md mb-6">
              Hubungi kami hari ini untuk mendiskusikan kebutuhan kemasan Anda
              dan biarkan kami membantu menciptakan pengalaman yang berkesan.
            </p>
            <a
              href="https://wa.me/6287788261298?text=Halo%20admin%2C%20saya%20tertarik%20dengan%20produk%20Anda.%20Bisa%20minta%20detailnya%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>

          <div className="w-full h-64 md:h-80 bg-[#F9F6EE]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.7603001896737!2d112.6744988!3d-7.2680958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fe82331a6083%3A0x5822c119bea5851e!2sJl.%20Gadel%20Sari%20Madya%20II%20No.45%2C%20Gadel%2C%20Kec.%20Tandes%2C%20Surabaya%2C%20Jawa%20Timur%2060216!5e0!3m2!1sid!2sid!4v1754388155722!5m2!1sid!2sid"
              className="w-full h-full rounded-lg shadow-md"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Nichibag.id"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
