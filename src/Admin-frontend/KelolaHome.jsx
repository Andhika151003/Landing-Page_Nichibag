// src/Admin-frontend/KelolaHome.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Plus, Trash2, Upload, Link2, Save, X, Percent } from "lucide-react";
import Swal from "sweetalert2";

// Set default baseURL untuk axios biar gak tulis localhost panjang-panjang
axios.defaults.baseURL = "http://127.0.0.1:5000";

// ================== VALIDASI GAMBAR ==================
const validateImageRatio = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const width = this.width;
        const height = this.height;
        const ratio = width / height;
        resolve(ratio > 1.7 && ratio < 1.8); // validasi rasio 16:9
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// ================== SECTION MANAGER ==================
const SectionManager = ({ title, items, onDelete, onAdd, limit }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const fileInputRef = useRef(null);

  // cleanup preview image
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ganti gambar
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (title === "Gambar Carousel") {
      const isRatioValid = await validateImageRatio(selectedFile);
      if (!isRatioValid) {
        Swal.fire({
          icon: "error",
          title: "Rasio Gambar Salah",
          text: `Gambar "${selectedFile.name}" tidak memiliki rasio 16:9.`,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePreviewImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  };

  const handleAdd = async () => {
    if (!file) {
      return Swal.fire("Peringatan", "Pilih gambar terlebih dahulu.", "warning");
    }

    const formData = new FormData();
    formData.append("images", file);

    try {
      Swal.fire({
        title: "Menyimpan...",
        text: "Tunggu sebentar, data sedang diproses.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const uploadRes = await axios.post("/api/upload", formData);
      const imageUrl = uploadRes.data.imageUrls[0];
      
      const itemToAdd = {
        nama: itemName || "Item Baru",
        url: imageUrl,
        link: itemLink,
      };

      if (title === 'Produk Terlaris') {
        const normalPrice = parseFloat(price);
        const discount = parseFloat(discountPercentage);

        itemToAdd.price = !isNaN(normalPrice) ? normalPrice : 0;

        if (!isNaN(normalPrice) && !isNaN(discount) && discount > 0) {
          itemToAdd.discountPrice =
            normalPrice - normalPrice * (discount / 100);
          itemToAdd.discountPercentage = discount;
        } else {
          itemToAdd.discountPrice = null;
          itemToAdd.discountPercentage = null;
        }
      }

      // Memanggil onAdd hanya sekali
      await onAdd(itemToAdd);

      Swal.fire("Sukses!", "Data berhasil disimpan.", "success");

      // reset form
      removePreviewImage();
      setItemName("");
      setItemLink("");
      setPrice("");
      setDiscountPercentage("");
    } catch (error) {
      console.error("Error saat tambah:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Gagal menyimpan data.",
        "error"
      );
    }
  };

  const isLimitReached = items.length >= limit;
  const isProductSection = title === 'Produk Terlaris';
  const isNameNeeded = title === 'Produk Terlaris' || title === 'Kategori Unggulan';

  return (
    <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span
          className={`text-sm font-medium ${
            isLimitReached ? "text-red-500" : "text-gray-500"
          }`}
        >
          {items.length}/{limit}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {items.map((item) => (
          <div key={item._id} className="relative group">
            <img
              src={`http://127.0.0.1:5000${item.url}`}
              alt={item.nama || "item"}
              className="rounded-lg w-full h-32 object-cover"
            />
            <button
              onClick={() => onDelete(item._id)}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            {item.nama && (
              <p className="text-center text-sm mt-2 font-medium">{item.nama}</p>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex flex-col gap-4">
          {isNameNeeded && (
              <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Item</label>
                  <input 
                    type="text" 
                    value={itemName} 
                    onChange={(e) => setItemName(e.target.value)} 
                    placeholder={isProductSection ? "Nama Produk" : "Nama Kategori"} 
                    className="w-full p-2 border rounded-md" 
                    disabled={isLimitReached} 
                  />
              </div>
          )}
          {/* --- PERBAIKAN: Input Link Duplikat Dihapus, Hanya Menyisakan Satu --- */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link
            </label>
            <div className="relative">
              <Link2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={itemLink}
                onChange={(e) => setItemLink(e.target.value)}
                placeholder="Contoh: https://shopee.co.id/PAPER-BAG-PREMIUM...."
                className="w-full p-2 pl-10 border rounded-md"
                disabled={isLimitReached}
              />
            </div>
          </div>

          {isProductSection && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga Normal (Rp)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Contoh: 50000"
                  className="w-full p-2 border rounded-md"
                  disabled={isLimitReached}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diskon (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    placeholder="Contoh: 15"
                    className="w-full p-2 border rounded-md pr-8"
                    disabled={isLimitReached}
                  />
                  <Percent
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pilih Gambar
            </label>
            <label
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border-2 border-dashed rounded-md h-[42px] ${
                isLimitReached
                  ? "cursor-not-allowed bg-gray-100"
                  : "cursor-pointer hover:border-pink-500 hover:bg-pink-50"
              }`}
            >
              <Upload size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                Pilih Gambar
              </span>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                disabled={isLimitReached}
              />
            </label>
          </div>
        </div>

        {preview && (
          <div className="mt-4">
            <div className="relative w-24 h-24">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={removePreviewImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={isLimitReached || !file}
          className="mt-4 w-auto bg-pink-500 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Plus size={16} /> Tambah
        </button>

        {title === "Gambar Carousel" && (
          <p className="text-xs text-gray-500 mt-2 text-left">
            *Hanya gambar dengan rasio 16:9 (misal: 1920x1080 pixels) yang akan
            diterima.
          </p>
        )}
      </div>
    </section>
  );
};

// ================== HERO BUTTON MANAGER ==================
const HeroButtonManager = ({ buttonData, onSave }) => {
  const [link, setLink] = useState(buttonData ? buttonData.buttonLink : "");

  useEffect(() => {
    if (buttonData) setLink(buttonData.buttonLink);
  }, [buttonData]);

  const handleSave = () => {
    onSave({ buttonLink: link });
    Swal.fire("Tersimpan!", "Link tombol berhasil diperbarui.", "success");
  };

    return (
        <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Kelola Tombol "Order Now" di Hero Section</h3>
            <div className="flex flex-col md:flex-row items-end gap-4">
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Tujuan</label>
                    <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="w-full p-2 pl-10 border rounded-md" placeholder="Contoh : https://shopee.co.id/nichibag.id" />
                    </div>
                </div>
                <button onClick={handleSave} className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600">
                    <Save size={16} /> Simpan
                </button>
            </div>
        </section>
    );
};

// ================== MAIN COMPONENT ==================
const KelolaHome = (props) => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [heroButton, setHeroButton] = useState({ buttonLink: '' });

  const fetchData = async () => {
    try {
      const [carouselRes, featuredRes, categoryRes, buttonRes] =
        await Promise.all([
          axios.get("/home/carousel"),
          axios.get("/home/featured-products"),
          axios.get("/home/categories"),
          axios.get("/home/hero-button"),
        ]);
      setCarouselImages(carouselRes.data);
      setFeaturedProducts(featuredRes.data);
      setCategories(categoryRes.data);
      setHeroButton(buttonRes.data);
    } catch (error) {
      console.error("Gagal memuat data halaman utama:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (type, id) => {
    Swal.fire({
      title: "Anda Yakin?",
      text: "Item ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/home/${type}/${id}`);
          fetchData();
          Swal.fire("Terhapus!", "Item berhasil dihapus.", "success");
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus item.", "error");
        }
      }
    });
  };

  const handleAdd = async (type, data) => {
    try {
      await axios.post(`/home/${type}`, data);
      fetchData();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || `Gagal menambah ${type}.`,
        "error"
      );
    }
  };

  const handleSaveButton = async (data) => {
    try {
      await axios.put(`/home/hero-button`, data);
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Gagal menyimpan perubahan tombol.", "error");
    }
  };

  return (
    <div
      className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen"
      {...props}
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-900">
        Kelola Halaman Utama
      </h2>

      <HeroButtonManager buttonData={heroButton} onSave={handleSaveButton} />

      <SectionManager
        title="Gambar Carousel"
        items={carouselImages}
        onDelete={(id) => handleDelete("carousel", id)}
        onAdd={(data) => handleAdd("carousel", data)}
        limit={4}
      />

      <SectionManager
        title="Produk Terlaris"
        items={featuredProducts}
        onDelete={(id) => handleDelete("featured-products", id)}
        onAdd={(data) => handleAdd("featured-products", data)}
        limit={6}
      />

      <SectionManager
        title="Kategori Unggulan"
        items={categories}
        onDelete={(id) => handleDelete("categories", id)}
        onAdd={(data) => handleAdd("categories", data)}
        limit={6}
      />
    </div>
  );
};

export default KelolaHome;