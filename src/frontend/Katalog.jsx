// src/frontend/Katalog.jsx

import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion as Motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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

const Katalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Ambil parameter dari URL (search & category)
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  // State untuk kategori yang dipilih (default: All)
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 1. Fetch Data Produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. Sinkronisasi URL dengan State SelectedCategory
  // Jika URL punya ?category=PaperBag, maka state otomatis berubah
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryParam]);

  // 3. Generate Kategori Secara Dinamis dari Data Produk
  // Mengambil semua nama kategori unik dari produk yang tersedia
  const categories = useMemo(() => {
    const uniqueCats = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return ["All", ...uniqueCats];
  }, [products]);

  // 4. Logic Filter Produk (Gabungan Kategori & Search)
  const filteredProducts = products
    .filter((product) => {
      // Filter Kategori
      if (selectedCategory === "All") return true;
      return product.category === selectedCategory;
    })
    .filter((product) => {
      // Filter Search Query
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    
  const formatRupiah = (number) => {
    const validNumber = typeof number === 'number' ? number : 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(validNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9F6EE] pt-24">
        <p className="text-lg text-red-700">Memuat data produk...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F6EE] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-red-700 hover:text-red-500 flex items-center gap-2 font-semibold w-max"
          >
            <ArrowLeft size={18} />
            Kembali ke Halaman Utama
          </Link>
        </div>
        
        <Motion.header
          className="text-center pb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-extrabold text-red-700 tracking-tight">
            Katalog Produk
          </h1>
          <p className="mt-4 text-lg text-red-700 max-w-2xl mx-auto">
            Temukan semua produk terbaik kami dalam satu tempat.
          </p>
        </Motion.header>

        {/* --- DAFTAR KATEGORI (DINAMIS) --- */}
        <div className="flex gap-2 sm:gap-4 p-4 justify-center flex-wrap sticky top-[80px] bg-[#F9F6EE] backdrop-blur-sm z-40 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#f8d7d0] text-red-700 shadow-lg scale-105" // Style Aktif
                  : "bg-white text-gray-700 hover:bg-gray-200 shadow-sm" // Style Non-Aktif
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- GRID PRODUK --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 pb-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Motion.div
                key={product._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col border-2 border-red-800"
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
                    {product.colors && product.colors.length > 0 ? (
                      <img
                        src={`http://127.0.0.1:5000${product.colors[0].imageUrls[0]}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 border-b-2 border-red-800"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                    
                    {/* Badge Diskon */}
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                        -{product.discountPercentage}%
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-sm font-semibold text-red-700 group-hover:text-red-600 transition-colors flex-grow min-h-[40px] line-clamp-2">
                      {product.name}
                    </p>
                    
                    <div className="mt-2">
                      {product.discountPrice && product.discountPercentage > 0 ? (
                        <>
                          <p className="text-xs text-gray-500 line-through">
                            {formatRupiah(product.price)}
                          </p>
                          <p className="text-md font-bold text-red-600">
                            {formatRupiah(product.discountPrice)}
                          </p>
                        </>
                      ) : (
                        <p className="text-md font-bold text-gray-900 mt-1">
                          {formatRupiah(product.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </Motion.div>
            ))
          ) : (
             <div className="col-span-full text-center py-16">
              <p className="text-gray-600 text-lg font-semibold">
                Produk tidak ditemukan.
              </p>
              <p className="text-gray-500 mt-2">
                Coba cari dengan kata kunci lain atau pilih kategori berbeda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Katalog;