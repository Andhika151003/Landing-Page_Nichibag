import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion as Motion } from "framer-motion";

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

  const categories = [
    "All",
    "Paper bag",
    "Gift box",
    "Gift card",
    "Ribbon",
    "Kotak sepatu",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Pastikan URL server Anda benar
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Gabungkan filter kategori dan pencarian
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === "All") {
        return true; // Tampilkan semua jika kategori "All"
      }
      // Pastikan produk Anda memiliki properti 'category'
      return product.category === selectedCategory;
    })
    .filter((product) => {
      // Filter berdasarkan query pencarian
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

  if (loading) {
    return (
      <div className="pt-24 text-center min-h-screen">Memuat produk...</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto">
        <Motion.header
          className="text-center p-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Katalog Produk
          </h1>
          {searchQuery ? (
            <p className="mt-4 text-lg text-gray-600">
              Hasil pencarian untuk:{" "}
              <span className="font-bold">"{searchQuery}"</span>
            </p>
          ) : (
            <p className="mt-4 text-lg text-gray-600">
              Temukan semua produk terbaik kami dalam satu tempat.
            </p>
          )}
        </Motion.header>

        <div className="flex gap-2 sm:gap-4 p-4 justify-center flex-wrap sticky top-[80px] bg-gray-50/80 backdrop-blur-sm z-40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-red-700 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-200 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Motion.div
                key={product._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                // Hapus transition delay dari sini agar tidak mengganggu Link
              >
                <Link
                  to={`/product/${product._id}`} // Tentukan URL tujuan
                  className=" bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col"
                >
                  <div className="relative w-full h-48 bg-gray-200">
                    {product.colors && product.colors.length > 0 ? (
                      <img
                        src={`http://localhost:5000${product.colors[0].imageUrl}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-red-600 transition-colors flex-grow">
                      {product.name}
                    </p>
                    <p className="text-md font-bold text-gray-900 mt-1">
                      Rp{product.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              </Motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              Produk tidak ditemukan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Katalog;
