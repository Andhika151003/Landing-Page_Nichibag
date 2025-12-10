// src/frontend/home.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Button from "../components/ButtonProduct";
import HeroSection from "../components/HeroSection";
import { motion as Motion } from "framer-motion"; // Import motion

// Definisikan varian animasi
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const Product = ({ products }) => {
  const formatRupiah = (number) => {
    const validNumber = typeof number === 'number' ? number : 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(validNumber);
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Motion.header
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Produk Terlaris yang Wajib Dimiliki
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Dipesan ratusan kali setiap bulan, inilah pilihan yang tak pernah mengecewakan.
          </p>
        </Motion.header>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Motion.li
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-shadow duration-300 hover:shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={product.link || "/katalog"} className="group block overflow-hidden">
                <div className="relative">
                  <img
                    src={`http://127.0.0.1:5000${product.url}`}
                    alt={product.nama}
                    className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px] rounded-md"
                  />
                  {(product.discountPercentage || 0) > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </div>
                <div className="relative pt-3">
                  <h3 className="text-base text-gray-700 group-hover:underline group-hover:underline-offset-4 text-center h-12">
                    {product.nama}
                  </h3>
                  <div className="mt-2 flex flex-col items-center justify-center">
                    {(product.discountPrice || 0) > 0 ? (
                      <>
                        <p className="text-sm text-gray-500 line-through">
                          {formatRupiah(product.price || 0)}
                        </p>
                        <p className="text-lg font-bold text-red-600">
                          {formatRupiah(product.discountPrice || 0)}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-gray-800">
                        {formatRupiah(product.price || 0)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </Motion.li>
          ))}
        </ul>
      </div>
      <Motion.div
        className="mt-6 flex justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}
      >
        <Button />
      </Motion.div>
    </section>
  );
};

const Category = ({ categories }) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Motion.header
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Temukan Kategori Produk Favorit Semua Orang!
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-500">
             Dari ratusan pilihan, inilah kategori yang selalu jadi incaran — siap temukan yang cocok untuk Anda?
          </p>
        </Motion.header>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Motion.li
              key={category._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-shadow duration-300 hover:shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={category.link || "/katalog"} className="group block overflow-hidden">
                <img
                  src={`http://127.0.0.1:5000${category.url}`}
                  alt={category.nama}
                  className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px] rounded-md"
                />
                <div className="relative pt-3">
                  <h3 className="text-base text-gray-700 group-hover:underline group-hover:underline-offset-4 text-center">
                    {category.nama}
                  </h3>
                </div>
              </Link>
            </Motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featuredRes, categoryRes] = await Promise.all([
          axios.get("http://127.0.0.1:5000/home/featured-products"),
          axios.get("http://127.0.0.1:5000/home/categories")
        ]);
        setFeaturedProducts(featuredRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Gagal memuat data homepage:", error);
      }
    };
    fetchHomeData();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Carousel />
      <div className="px-8 py-16 bg-[#F9F6EE]">
        <Product products={featuredProducts} />
      </div>
      <div className="bg-[#F9F6EE]">
        <HeroSection /> 
      </div>
      <div className="bg-[#F9F6EE]">
        <Category categories={categories} />
      </div>
    </div>
  );
};

export default Home;