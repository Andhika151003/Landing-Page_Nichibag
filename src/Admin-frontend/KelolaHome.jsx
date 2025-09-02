// src/Admin-frontend/KelolaHome.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Upload } from "lucide-react"; // Import ikon Upload

// Komponen kecil untuk setiap bagian agar lebih rapi
const SectionManager = ({ title, items, onDelete, onAdd }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [itemName, setItemName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleAdd = async () => {
    // Cek apakah ada file yang dipilih (kecuali untuk Kategori)
    if (!file && title !== 'Kategori Unggulan') {
        alert("Pilih gambar terlebih dahulu!");
        return;
    }

    // Jika Kategori, hanya butuh nama
    if (title === 'Kategori Unggulan') {
        if (!itemName) return alert("Nama kategori tidak boleh kosong!");
        onAdd({ name: itemName });
        setItemName('');
        return;
    }
    
    // Untuk Carousel dan Produk Terlaris, upload gambar dulu
    const formData = new FormData();
    formData.append('image', file);

    try {
        const uploadRes = await axios.post("http://localhost:5000/api/upload", formData);
        const imageUrl = uploadRes.data.imageUrl;
        
        // Kirim data ke fungsi onAdd
        const dataToAdd = {
            name: itemName || 'Item Baru', // Beri nama default jika kosong
            url: imageUrl, // Untuk Carousel
            imageUrl: imageUrl // Untuk Produk & Kategori
        };
        onAdd(dataToAdd);

        // Reset form setelah berhasil
        setFile(null);
        setPreview(null);
        setItemName('');
    } catch (error) {
        console.error("Gagal mengupload gambar:", error);
        alert("Gagal mengupload gambar.");
    }
  };

  return (
    <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {items.map((item) => (
          <div key={item._id} className="relative group">
            <img 
              src={`http://localhost:5000${item.url || item.imageUrl}`} 
              alt={item.name || 'item'} 
              className="rounded-lg w-full h-32 object-cover" 
            />
            <button
              onClick={() => onDelete(item._id)}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            {item.name && <p className="text-center text-sm mt-2 font-medium">{item.name}</p>}
          </div>
        ))}
      </div>
      
      {/* Form Tambah Baru */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 border-t">
        <div className="flex-1">
            {title !== 'Gambar Carousel' && (
                 <input 
                    type="text" 
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder={title === 'Kategori Unggulan' ? "Nama Kategori Baru" : "Nama Produk Baru"} 
                    className="w-full p-2 border rounded-md"
                />
            )}
        </div>
        <div className="flex items-center gap-4 flex-1">
            <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:border-pink-500 hover:bg-pink-50">
                <Upload size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Pilih Gambar</span>
                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </label>
            {preview && <img src={preview} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />}
        </div>
        <button
          onClick={handleAdd}
          className="bg-pink-500 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-pink-600"
        >
          <Plus size={16} /> Tambah
        </button>
      </div>
       {title === 'Gambar Carousel' && (
           <p className="text-xs text-gray-500 mt-2 text-center md:text-left">
               *Rekomendasi ukuran gambar dengan rasio 16:9 (misal: 1920x1080 pixels) agar pas di halaman utama.
           </p>
       )}
    </section>
  );
};


const KelolaHome = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const [carouselRes, featuredRes, categoryRes] = await Promise.all([
        axios.get("http://localhost:5000/home/carousel"),
        axios.get("http://localhost:5000/home/featured-products"),
        axios.get("http://localhost:5000/home/categories")
      ]);
      setCarouselImages(carouselRes.data);
      setFeaturedProducts(featuredRes.data);
      setCategories(categoryRes.data);
    } catch (error) {
      console.error("Gagal memuat data halaman utama:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    if (window.confirm("Yakin ingin menghapus item ini?")) {
      try {
        await axios.delete(`http://localhost:5000/home/${type}/${id}`);
        fetchData();
      } catch (error) {
        console.error(`Gagal menghapus ${type}:`, error);
      }
    }
  };
  
  const handleAdd = async (type, data) => {
    try {
      await axios.post(`http://localhost:5000/home/${type}`, data);
      fetchData();
    } catch (error) {
      console.error(`Gagal menambah ${type}:`, error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Kelola Halaman Utama</h2>

      <SectionManager 
        title="Gambar Carousel" 
        items={carouselImages}
        onDelete={(id) => handleDelete('carousel', id)}
        onAdd={(data) => handleAdd('carousel', data)}
      />
      <SectionManager 
        title="Produk Terlaris" 
        items={featuredProducts}
        onDelete={(id) => handleDelete('featured-products', id)}
        onAdd={(data) => handleAdd('featured-products', data)}
      />
      <SectionManager 
        title="Kategori Unggulan" 
        items={categories}
        onDelete={(id) => handleDelete('categories', id)}
        onAdd={(data) => handleAdd('categories', data)}
      />
    </div>
  );
};

export default KelolaHome;