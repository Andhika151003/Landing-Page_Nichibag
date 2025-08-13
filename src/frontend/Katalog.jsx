import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Katalog = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setProducts([
      { id: 1, name: "PAPER BAG PREMIUM SUPER BLACK", image: "src/assets/hero1.png", category: "Gift Bag", tag: "SALE" },
      { id: 2, name: "KOTAK KADO UNTUK PAKAIAN", image: "src/assets/hero2.png", category: "Gift Box", tag: "SALE" },
      { id: 3, name: "KERTAS WARNA PREMIUM", image: "src/assets/hero3.png", category: "Gift Box", tag: "SALE" },
      { id: 4, name: "RIBBON HITAM PUTIH", image: "src/assets/produk.png", category: "Satin Ribbon", tag: "SALE" }
    ]);
  }, []);

  const categories = ["All", "Gift Box", "Gift Bag", "Satin Ribbon"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-20 max-w-7xl mx-auto">
      {/* Filter kategori */}
      <div className="flex gap-2 sm:gap-3 p-4 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base transition-colors ${
              selectedCategory === cat
                ? "bg-red-500 text-black"
                : "bg-gray-200 hover:bg-red-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 p-4">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition block bg-white"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto sm:h-48 object-cover"
              />
              {product.tag && (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                  {product.tag}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm sm:text-base font-medium truncate">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Katalog;
