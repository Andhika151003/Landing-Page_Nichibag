import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setProduct(null); 
        setError(null);
        
        const response = await axios.get(`http://localhost:5000/products/by-productid/${id}`);
        
        setProduct(response.data);
        setCurrentIndex(0);
      } catch (err) {
        // PERBAIKAN 1: Pesan error yang lebih deskriptif
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data.msg || 'Produk tidak ditemukan.'}`);
        } else {
          setError("Gagal terhubung ke server. Periksa koneksi Anda.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // PERBAIKAN 2: Urutan guard clause yang benar untuk mencegah crash
  if (loading) {
    return <div className="pt-24 text-center min-h-screen">Memuat data produk...</div>;
  }

  if (error) {
    return <p className="pt-24 text-center text-red-500 min-h-screen">{error}</p>;
  }

  if (!product) {
    return <p className="pt-24 text-center min-h-screen">Produk tidak ditemukan.</p>;
  }
  
  // Kode di bawah ini sekarang dijamin aman
  const productImages = product.images || [];

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? productImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === productImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <div>
            {/* PERBAIKAN 3: Menangani jika produk tidak punya gambar */}
            {productImages.length > 0 ? (
              <>
                <div className="relative mb-4 border rounded-lg overflow-hidden shadow-lg bg-white">
                  <div className="aspect-square w-full">
                    <img
                      // PERBAIKAN 4: Format URL gambar yang benar
                      src={`http://localhost:5000${productImages[currentIndex]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {productImages.length > 1 && (
                    <>
                      <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition">
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition">
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`border rounded-md overflow-hidden transition ${currentIndex === index ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-200'}`}
                    >
                      <img 
                        // PERBAIKAN 4: Format URL gambar yang benar untuk thumbnail
                        src={`http://localhost:5000${img}`} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-auto object-cover aspect-square" />
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
          </div>

          {/* Kolom Kanan: Info Produk (dibuat lebih aman dengan optional chaining) */}
          <div>
            <p className="text-sm font-semibold text-red-600 mb-1">Nichibag.id</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="my-4">
              <span className="text-4xl font-bold text-gray-800">
                Rp{(product.price ?? 0).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="prose prose-sm max-w-none text-gray-600 mt-6">
              <h3 className="font-bold text-gray-800">Detail Produk:</h3>
              <p>{product.description}</p>
              <h3 className="font-bold text-gray-800 mt-4">Informasi Lainnya:</h3>
              <ul>
                <li><strong>Kode:</strong> {product.productID}</li>
                <li><strong>Kategori:</strong> {product.category}</li>
                <li><strong>Kondisi:</strong> 100% Brand New</li>
              </ul>
            </div>
            <div className="mt-8">
              <button className="w-full bg-red-600 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg">
                <ShoppingCart />
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;