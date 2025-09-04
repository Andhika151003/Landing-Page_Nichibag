import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Katalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ["All", "Paper bag", "Gift box", "Gift card", "Ribbon", "Kotak sepatu"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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

  const filteredProducts = products
    // .filter((p) => {
    
    // })
    .filter((p) => {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

  if (loading) {
    return <div className="pt-24 text-center min-h-screen">Memuat produk...</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="text-center p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Katalog Produk</h1>
            {searchQuery ? (
              <p className="mt-4 text-lg text-gray-600">Hasil pencarian untuk: <span className="font-bold">"{searchQuery}"</span></p>
            ) : (
              <p className="mt-4 text-lg text-gray-600">Temukan semua produk terbaik kami dalam satu tempat.</p>
            )}
        </header>
      
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
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product.productID}`}
                key={product._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 block bg-white group"
              >
                <div className="relative w-full h-48 bg-gray-200">
                  {product.images && product.images.length > 0 && (
                    <img
                      // <-- PERUBAHAN DI SINI
                      src={`http://localhost:5000${product.images[0]}`} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-red-600 transition-colors">
                    {product.name}
                  </p>
                  <p className="text-md font-bold text-gray-900 mt-1">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">Produk tidak ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Katalog;