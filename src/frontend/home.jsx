// src/frontend/home.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import Button from "../components/ButtonProduct";
import HeroSection from "../components/HeroSection";

// ====================================================================
// KOMPONEN PRODUK (STRUKTUR ASLI ANDA)
// ====================================================================
const Product = ({ products }) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Produk Terlaris yang Wajib Dimiliki
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Dipesan ratusan kali setiap bulan, inilah pilihan yang tak pernah mengecewakan.
          </p>
        </header>
        {/* Menampilkan data dinamis dari 'products' */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product._id}>
              <a href="#" className="group block overflow-hidden">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
                />
                <div className="relative bg-transparent pt-3">
                  <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.name}
                  </h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex justify-center">
        <Button />
      </div>
    </section>
  );
};

// ====================================================================
// KOMPONEN KATEGORI (STRUKTUR ASLI ANDA)
// ====================================================================
const Category = ({ categories }) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Temukan Kategori Produk Favorit Semua Orang!
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-500">
             Dari ratusan pilihan, inilah kategori yang selalu jadi incaran — siap temukan yang cocok untuk Anda?
          </p>
        </header>
        {/* Menampilkan data dinamis dari 'categories' */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category._id}>
              <a href="#" className="group block overflow-hidden">
                <img
                  src={category.imageUrl || "https://via.placeholder.com/300"}
                  alt={category.name}
                  className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[250px]"
                />
                <div className="relative bg-transparent pt-3">
                  <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {category.name}
                  </h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ====================================================================
// KOMPONEN UTAMA HOME
// ====================================================================
const Home = () => {
  // Logika untuk mengambil data dari backend
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featuredRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:5000/home/featured-products"),
          axios.get("http://localhost:5000/home/categories")
        ]);
        setFeaturedProducts(featuredRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Gagal memuat data homepage:", error);
      }
    };
    fetchHomeData();
  }, []);
  
  // Tampilan JSX Anda kembali seperti semula
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