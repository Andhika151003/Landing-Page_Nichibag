import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion as Motion } from "framer-motion";
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  ArrowLeft,
  Package,
  Weight,
  Ruler,
} from "lucide-react";

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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        setLoading(false);
        setError("ID produk tidak valid.");
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        const productData = response.data;
        setProduct(productData);

        if (productData?.colors?.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
        setCurrentIndex(0);
      } catch (err) {
        setError(
          err.response
            ? `Error ${err.response.status}: Produk tidak ditemukan.`
            : "Gagal terhubung ke server."
        );
        console.error("Gagal mengambil detail produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCurrentIndex(0);
  };

  const productImages = selectedColor?.imageUrls || [];

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? productImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === productImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-24">
        <p className="text-lg text-gray-600">Memuat data produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pt-24 text-center px-4">
        <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
        <Link
          to="/katalog"
          className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
        >
          <ArrowLeft size={18} /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="pt-24 text-center min-h-screen">
        Produk tidak dapat ditemukan.
      </p>
    );
  }

  const hasDiscount =
    product.discountPercentage > 0 && product.discountPrice != null;
  
  // --- PERBAIKAN: Memberi nilai default untuk dimensions ---
  const { material, weight = 0, dimensions = {}, productCode } = product;

  // --- PERBAIKAN: Logika untuk mengecek dimensi ---
  const hasDimensions =
    dimensions &&
    (dimensions.length > 0 || dimensions.width > 0 || dimensions.height > 0);

  return (
    <div className="bg-[#F9F6EE] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link
            to="/katalog"
            className="text-gray-600 hover:text-red-700 flex items-center gap-2 font-semibold"
          >
            <ArrowLeft size={18} />
            Kembali ke Katalog
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <Motion.div variants={fadeInUp} initial="hidden" animate="visible">
            {productImages.length > 0 ? (
              <>
                <div className="relative mb-4 border rounded-lg overflow-hidden shadow-lg bg-white">
                  <div className="aspect-square w-full">
                    <img
                      src={`http://localhost:5000${productImages[currentIndex]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {productImages.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-red-700 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-red-700 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`border rounded-md overflow-hidden transition ${
                        currentIndex === index
                          ? "border-red-500 ring-2 ring-red-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={`http://localhost:5000${img}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-auto object-cover aspect-square"
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="aspect-square w-full border rounded-lg bg-gray-100 flex flex-col justify-center items-center text-gray-500">
                <ImageOff size={48} />
                <p className="mt-2 font-semibold">Tidak ada gambar</p>
              </div>
            )}
          </Motion.div>

          <Motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
          >
            <p className="text-sm font-semibold text-red-600 mb-1">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {productCode && (
              <p className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Package size={16} />
                Kode: {productCode}
              </p>
            )}

            <div className="my-4 flex items-center gap-4">
              <span
                className={`text-4xl font-bold ${
                  hasDiscount ? "text-red-600" : "text-gray-800"
                }`}
              >
                Rp
                {(hasDiscount && product.discountPrice
                  ? product.discountPrice
                  : product.price
                ).toLocaleString("id-ID")}
              </span>
              {hasDiscount && (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-400 line-through">
                    Rp{product.price.toLocaleString("id-ID")}
                  </span>
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md">
                    Diskon {product.discountPercentage}%
                  </span>
                </div>
              )}
            </div>
            
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2">
                  WARNA:{" "}
                  <span className="font-medium text-gray-600">
                    {selectedColor?.name}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color._id}
                      onClick={() => handleColorSelect(color)}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedColor?._id === color._id
                          ? "border-red-600 ring-2 ring-offset-1 ring-red-500"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Pilih warna ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="prose prose-sm max-w-none text-gray-600 mt-8">
              <h3 className="font-bold text-gray-800">Deskripsi Produk:</h3>
              <p>
                {product.description || "Tidak ada deskripsi untuk produk ini."}
              </p>
              
              {(material || weight > 0 || hasDimensions) && (
                 <>
                    <h3 className="font-bold text-gray-800 mt-6">
                        Spesifikasi:
                    </h3>
                    <ul className="list-none p-0 space-y-2">
                        {material && (
                            <li className="flex items-center gap-2">
                                <Package size={16} className="text-gray-500" />
                                <strong>Bahan:</strong> {material}
                            </li>
                        )}
                        {weight > 0 && (
                            <li className="flex items-center gap-2">
                                <Weight size={16} className="text-gray-500" />
                                <strong>Berat:</strong> {weight} gram
                            </li>
                        )}
                        {hasDimensions && (
                            <li className="flex items-center gap-2">
                                <Ruler size={16} className="text-gray-500" />
                                <strong>Ukuran:</strong> {dimensions.length || 0} x{" "}
                                {dimensions.width || 0} x {dimensions.height || 0} cm
                            </li>
                        )}
                    </ul>
                 </>
              )}
            </div>

            <div className="mt-8">
              <a
                href={product.orderLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full bg-red-600 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg ${
                  !product.orderLink
                    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400 hover:scale-100"
                    : ""
                }`}
                onClick={(e) => !product.orderLink && e.preventDefault()}
              >
                <ShoppingCart /> Pesan Sekarang di Shopee
              </a>
              <p className="text-xs text-gray-500 text-center mt-3">
                Dengan menekan tombol ini, Anda akan diarahkan ke halaman pemesanan shopee sesuai produk yang anda pilih.
              </p>
            </div>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;