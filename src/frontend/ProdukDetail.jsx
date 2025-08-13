import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const products = [
    {
      id: 1,
      name: "PAPER BAG PREMIUM SUPER BLACK 15x6x19",
      image: "src/assets/hero1.png",
      details: {
        kode: "NCBP15X19H-B",
        brand: "NICHI BRAND",
        bahan: "Paper Kraft Super 230 gram (Import)",
        warna: "Super Black plus pita ribbon",
        ukuran: "15x6x19 cm",
        kondisi: "100% Brand New",
        kegunaan: "Kado ulang tahun, wedding, pesta, souvenir",
      },
    },
    {
      id: 2,
      name: "KOTAK KADO UNTUK PAKAIAN",
      image: "src/assets/hero2.png",
    },
    {
      id: 3,
      name: "KERTAS WARNA PREMIUM",
      image: "src/assets/hero3.png",
    },
    {
      id: 4,
      name: "RIBBON HITAM PUTIH",
      image: "src/assets/produk.png",
    },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p className="p-6">Produk tidak ditemukan</p>;
  }

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto">
      {/* Layout Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gambar Produk */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain rounded-lg border"
        />

        {/* Info Produk */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

          {/* Detail Produk */}
          {product.details && (
            <div className="mt-4">
              <h2 className="font-semibold text-lg">Detail Produk</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                <li>Kode Produk: {product.details.kode}</li>
                <li>Brand: {product.details.brand}</li>
                <li>Bahan: {product.details.bahan}</li>
                <li>Warna: {product.details.warna}</li>
                <li>Ukuran: {product.details.ukuran}</li>
                <li>Kondisi: {product.details.kondisi}</li>
                <li>Kegunaan: {product.details.kegunaan}</li>
              </ul>
            </div>
          )}

          <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 w-full sm:w-auto">
            BELI SEKARANG
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id)
            .map((rel) => (
              <div
                key={rel.id}
                className="border rounded-lg p-4 text-center hover:shadow-lg transition"
              >
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-40 object-contain mb-2 rounded"
                />
                <h3 className="text-sm font-medium">{rel.name}</h3>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-red-500 text-white p-6 text-center mt-12 rounded-lg">
        <p className="mb-4 font-semibold">Follow Kami di Social Media</p>
        <div className="flex justify-center gap-3">
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
          <a href="#">
            <img
              src="https://www.logo.wine/a/logo/TikTok/TikTok-Logomark%26Wordmark-Vertical-Logo.wine.svg"
              alt="Tiktok"
              className="w-6 h-6"
            />
          </a>
          <a href="#">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-6 h-6"
            />
          </a>
        </div>
        <p className="mt-4 text-sm">© 2025 Nichi.id. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default ProductDetail;
