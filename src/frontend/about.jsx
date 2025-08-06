import React from "react";
import Gambar from "../assets/produk.png";
import { motion as Motion } from "framer-motion";
import SplitText from "../components/SplitText";
import Button from "../components/ModernButton";
import { motion as Motion, useScroll, useTransform, useSpring } from "framer-motion";
import CustomCursor from "../components/CustomCursor";
import Tilt from "react-parallax-tilt"; // Tambahan animasi 3D

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 40, stiffness: 400 });
  const scaleOnScroll = useTransform(scrollVelocity, [0, 1000], [1, 1.05]);
  const opacityOnScroll = useTransform(scrollVelocity, [0, 500], [1, 0.9]);

  return (
    <div className="pt-6 overflow-x-hidden">
      <CustomCursor />

      {/* Header */}
      <Motion.section
        className="text-white text-center pt-28 pb-20 bg-red-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SplitText
          text="Nichibag.id"
          className="text-4xl font-semibold text-center leading-[normal] align-bottom tracking-tight"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <p className="text-lg">Bukan Sekadar Tas, Ini Identitas</p>
      </Motion.section>

      {/* Siapa Kami */}
      <Motion.section
        className="bg-[#F9F6EE] flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-20 py-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="md:w-1/2">
          <h2 className="text-2xl text-black font-semibold mb-4">Siapa Kami</h2>
          <p className="text-black mb-4">
            Didirikan sejak tahun 2022, Nichi Bag hadir sebagai solusi kemasan modern yang mengutamakan kualitas, estetika, dan kepedulian terhadap lingkungan.
          </p>
          <p className="text-blue-600 font-semibold text-lg">500+ Klien yang puas</p>
        </div>
        <Motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ scale: scaleOnScroll }}
        >
          <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.02} transitionSpeed={1500}>
            <img src={Gambar} alt="Tentang Kami" className="rounded-lg shadow-lg" />
          </Tilt>
        </Motion.div>
      </Motion.section>

      {/* Visi Misi */}
      <Motion.section
        className="bg-red-800 py-16 px-6 md:px-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
              Mengubah cara bisnis melihat kemasan dari sekadar pembungkus
              menjadi media cerita, identitas, dan keberlanjutan.
            </p>
          </Motion.div>
          <Motion.div
            className="bg-white p-6 rounded-lg shadow-md w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-red-700 mb-2">Misi</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Membuat kemasan yang tidak hanya indah, tapi juga berdampak baik
                untuk lingkungan dan masyarakat.
              </li>
              <li>
                Menyediakan solusi packaging yang fleksibel dan personal bagi
                brand lokal maupun global.
              </li>
              <li>
                Menjadi pelopor dalam penggunaan bahan daur ulang dan proses
                produksi beretika.
              </li>
              <li>
                Berkolaborasi dengan klien sebagai partner, bukan hanya vendor.
              </li>
            </ul>
          </Motion.div>
          {[
            { title: "Visi", content: "Menjadi brand kemasan terdepan di Indonesia" },
            {
              title: "Misi",
              content: (
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Inovatif, Responsif, dan Siap Tumbuh</li>
                  <li>Dukung Gerakan Ramah Lingkungan</li>
                  <li>Menjadi Partner Branding</li>
                </ul>
              ),
            },
          ].map((item, i) => (
            <Motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: opacityOnScroll }}
            >
              <h3 className="text-lg font-semibold text-red-700 mb-2">{item.title}</h3>
              <div className="text-gray-700 leading-relaxed">{item.content}</div>
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* Nilai-Nilai */}
      <Motion.section
        className="py-20 px-6 md:px-20 bg-[#F9F6EE]"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#800000]">Nilai-Nilai Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              title: "Berkualitas",
              desc: "Kemasan Berkualitas Dan Berbahan Premium",
              icon: "🎯",
            },
            {
              title: "Inovasi",
              desc: "Selalu Menciptakan Produk Unggul",
              icon: "💡",
            },
            {
              title: "Ramah Lingkungan",
              desc: "Pilihan Terbaik Mengurangi Limbah Plastik",
              icon: "🌱",
            },
            {
              title: "Terpercaya",
              desc: "Memberikan Layanan Yang Terbaik",
              icon: "🤝",
            },
          ].map((item, i) => (
            <Motion.div
              key={i}
              className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{ scale: scaleOnScroll }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#800000] mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* Timeline dengan animasi 3D */}
      <Motion.section
        className="bg-red-800 py-16 px-6 md:px-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-12 text-center text-white">Perjalanan Kami</h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-1 bg-white h-full left-1/2 transform -translate-x-1/2 z-0" />
          {[
            {
              year: "2022",
              title: "Didirikan",
              desc: "Nichibag resmi berdiri pada tahun 2022 yang berada di kota Surabaya",
            },
            {
              year: "2023",
              title: "Berkembang",
              desc: "Memperluas jangkauan dan Pasar Produk dengan mengembangkan produk - produk yang inovatif",
            },
            {
              year: "2024",
              title: "Inovasi Digital",
              desc: "Mengembangkan platform digital",
            },
            {
              year: "2025",
              title: "Go Global",
              desc: "Menembus pasar internasional",
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
              <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02} transitionSpeed={1500}>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-red-800 font-bold text-lg mb-1">{item.year}</p>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </Tilt>
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-red-800 rounded-full z-20" />
            </Motion.div>
          ))}
        </div>
      </Motion.section>

      {/* CTA */}
      <Motion.section
        className="text-black text-center py-12 px-6 bg-white"
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
            href="https://wa.me/628973809698"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-white font-semibold px-6 py-2 rounded"
          >
            <Button text="Kontak Kami" />
          </a>
        </div>
      </Motion.section>
    </div>
  );
};

export default About;
