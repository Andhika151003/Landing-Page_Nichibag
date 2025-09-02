import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShoppingCart } from "lucide-react"; // Menggunakan ikon keranjang belanja

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/products/by-productid/${id}`);
        setProduct(response.data);
        // Atur gambar utama ke gambar pertama dari array saat data dimuat
        if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(response.data.images[0]);
        }
        setError(null);
      } catch (err) {
        setError("Produk tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="pt-24 text-center min-h-screen">Memuat data produk...</div>;
  }

  if (error) {
    return <p className="pt-24 text-center text-red-500 min-h-screen">{error}</p>;
  }

  if (!product) {
    return <p className="pt-24 text-center min-h-screen">Produk tidak ditemukan.</p>;
  }
  
  // Ambil semua gambar, jika tidak ada, gunakan gambar placeholder
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ["https://via.placeholder.com/400"];
    
  // Pastikan selectedImage punya nilai awal
  const mainImage = selectedImage || productImages[0];


  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Kolom Kiri: Galeri Gambar */}
          <div>
            <div className="mb-4 border rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`border rounded-md overflow-hidden transition ${selectedImage === img ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-200'}`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-auto object-cover aspect-square" />
                </button>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Info Produk */}
          <div>
            <p className="text-sm font-semibold text-red-600 mb-1">Nichi Store</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="my-4">
              <span className="text-4xl font-bold text-gray-800">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
              {/* Anda bisa tambahkan harga diskon di sini jika ada di data */}
              {/* <span className="text-xl text-gray-400 line-through ml-3">Rp15.500</span> */}
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