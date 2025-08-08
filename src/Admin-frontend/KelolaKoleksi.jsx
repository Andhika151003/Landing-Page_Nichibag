import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const KelolaKoleksi = () => {
  // Data dummy untuk contoh
  const [carouselImages, setCarouselImages] = useState([
    { id: 1, url: "https://via.placeholder.com/150/FFB6C1" },
    { id: 2, url: "https://via.placeholder.com/150/FFD580" },
    { id: 3, url: "https://via.placeholder.com/150/F4A460" },
  ]);

  const [produkTerbaik, setProdukTerbaik] = useState([
    { id: 1, nama: "Gaun Merah Marun Elegan", url: "https://via.placeholder.com/200/FFB6C1" },
    { id: 2, nama: "Blus Sutra Gading", url: "https://via.placeholder.com/200/B0E0E6" },
    { id: 3, nama: "Tas Tangan Kulit Merah Marun", url: "https://via.placeholder.com/200/8B0000" },
  ]);

  const [kategori, setKategori] = useState([
    { id: 1, nama: "Gaun" },
    { id: 2, nama: "Atasan" },
    { id: 3, nama: "Aksesoris" },
  ]);

  // CRUD Sederhana
  const handleTambah = (type) => {
    if (type === "carousel") {
      setCarouselImages([...carouselImages, { id: Date.now(), url: "https://via.placeholder.com/150/EEE" }]);
    } else if (type === "produk") {
      setProdukTerbaik([
        ...produkTerbaik,
        { id: Date.now(), nama: "Produk Baru", url: "https://via.placeholder.com/200" },
      ]);
    } else if (type === "kategori") {
      setKategori([...kategori, { id: Date.now(), nama: "Kategori Baru" }]);
    }
  };

  const handleHapus = (type, id) => {
    if (type === "carousel") {
      setCarouselImages(carouselImages.filter((item) => item.id !== id));
    } else if (type === "produk") {
      setProdukTerbaik(produkTerbaik.filter((item) => item.id !== id));
    } else if (type === "kategori") {
      setKategori(kategori.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Kelola Koleksi</h2>

      {/* Gambar Carousel */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Gambar Carousel</h3>
        <div className="flex gap-4">
          {carouselImages.map((img) => (
            <div key={img.id} className="relative">
              <img src={img.url} alt="" className="rounded-lg w-32 h-32 object-cover" />
              <button
                onClick={() => handleHapus("carousel", img.id)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleTambah("carousel")}
            className="bg-pink-500 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>
      </section>

      {/* Produk Terbaik */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Produk Terbaik</h3>
        <div className="grid grid-cols-3 gap-4">
          {produkTerbaik.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow p-3">
              <img src={p.url} alt={p.nama} className="w-full h-40 object-cover rounded" />
              <p className="mt-2 text-sm text-center">{p.nama}</p>
              <div className="mt-2 flex justify-center gap-2">
                <button
                  onClick={() => handleHapus("produk", p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleTambah("produk")}
            className="bg-pink-500 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>
      </section>

      {/* Kategori Produk */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Kategori Produk</h3>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Kategori</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kategori.map((k) => (
              <tr key={k.id} className="border-t">
                <td className="p-2">{k.nama}</td>
                <td className="p-2 text-blue-500 cursor-pointer">Lihat Semua Produk</td>
                <td>
                  <button
                    onClick={() => handleHapus("kategori", k.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleTambah("kategori")}
            className="bg-pink-500 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>
      </section>
    </div>
  );
};

export default KelolaKoleksi;
