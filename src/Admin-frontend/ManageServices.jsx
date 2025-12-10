import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Save, Upload, Trash2, HelpCircle } from "lucide-react";

const ManageServices = () => {
  const [data, setData] = useState({ cards: [{}, {}, {}], whatsappUrl: '', googleMapsUrl: '' });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Perbaikan: Menggunakan URL endpoint yang benar
      const res = await axios.get("http://127.0.0.1:5000/api/service");
      const fetchedData = res.data || {};
      if (!fetchedData.cards || fetchedData.cards.length !== 3) {
        fetchedData.cards = [{}, {}, {}].map((item, index) => fetchedData.cards?.[index] || item);
      }
      setData(fetchedData);
    } catch (error) {
      console.error("Gagal mengambil data layanan:", error);
      Swal.fire("Error", `Gagal mengambil data layanan: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardChange = (index, field, value) => {
    const newCards = [...data.cards];
    newCards[index][field] = value;
    setData({ ...data, cards: newCards });
  };
  
  const handleUrlChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('images', file);
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/upload", formData);
      // Perbaikan: Mengambil URL dari array imageUrls
      if (res.data.imageUrls && res.data.imageUrls.length > 0) {
        handleCardChange(index, 'imageUrl', res.data.imageUrls[0]);
      } else {
        Swal.fire("Error", "URL gambar tidak ditemukan di respons server.", "error");
      }
    } catch (error) {
       console.error("Gagal mengunggah gambar:", error);
       Swal.fire("Error", `Gagal mengunggah gambar: ${error.response?.data?.message || error.message}`, "error");
    }
  };

  const handleSave = async () => {
    try {
      // Perbaikan: Menghapus garis miring ganda pada URL
      await axios.put("http://127.0.0.1:5000/api/service", data);
      Swal.fire("Sukses!", "Data halaman layanan berhasil diperbarui.", "success");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      Swal.fire("Error", `Gagal menyimpan data: ${error.response?.data?.message || error.message}`, "error");
    }
  };

  if (loading) return <div className="p-8">Memuat data...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Halaman Layanan</h1>
        <button
          onClick={handleSave}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-600 transition"
        >
          <Save size={18} /> Simpan Perubahan
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Bagian "Layanan Kami"</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(data.cards).map((card, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4 bg-gray-50">
              <h3 className="font-bold text-gray-700">Kartu Layanan #{index + 1}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                {card.imageUrl && <img src={`http://127.0.0.1:5000${card.imageUrl}`} alt="preview" className="w-full h-32 object-cover rounded-md mb-2"/>}
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer w-full flex items-center justify-center gap-2 px-3 py-2 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 text-sm">
                    <Upload size={16} />
                    <span>Upload</span>
                    <input type="file" onChange={(e) => handleImageUpload(index, e.target.files[0])} className="hidden" accept="image/*" />
                  </label>
                  <button onClick={() => handleCardChange(index, 'imageUrl', '')} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={16}/></button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input type="text" value={card.title || ''} onChange={(e) => handleCardChange(index, 'title', e.target.value)} className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea value={card.description || ''} onChange={(e) => handleCardChange(index, 'description', e.target.value)} className="w-full p-2 border rounded-md" rows="3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Bagian CTA & Peta</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL WhatsApp</label>
            <input type="text" name="whatsappUrl" value={data.whatsappUrl || ''} onChange={handleUrlChange} className="w-full p-2 border rounded-md" placeholder="https://wa.me/62..."/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Embed Google Maps</label>
            <textarea name="googleMapsUrl" value={data.googleMapsUrl || ''} onChange={handleUrlChange} className="w-full p-2 border rounded-md font-mono text-xs" rows="5" placeholder="Contoh: https://www.google.com/maps/embed?..."/>
            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <HelpCircle size={14}/>
              Buka Google Maps, cari lokasi, klik "Share", lalu "Embed a map". Salin URL yang ada di dalam atribut `src="..."` dan tempel di sini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServices;