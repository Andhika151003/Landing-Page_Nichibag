import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import Swal from 'sweetalert2';

const AboutAdmin = () => {
  const [file, setFile] = useState(null);
  const [aboutData, setAboutData] = useState({ imageUrl: '', buttonUrl: '' });
  const [preview, setPreview] = useState(null);

  // Mengambil data yang ada dari server
  const fetchAboutData = () => {
    axios.get("http://localhost:5000/api/about")
      .then(res => {
        const data = res.data || { imageUrl: '', buttonUrl: '' };
        setAboutData(data);
        if (data.imageUrl) {
          setPreview(`http://localhost:5000${data.imageUrl}`);
        } else {
          setPreview(null);
        }
      })
      .catch(err => console.error("Gagal mengambil data about:", err));
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUrlChange = (e) => {
    setAboutData({ ...aboutData, buttonUrl: e.target.value });
  };

  // Fungsi untuk menghapus gambar
  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    setAboutData(prev => ({ ...prev, imageUrl: '' }));
  };

  // Fungsi untuk menyimpan perubahan
  const handleSave = async () => {
    let imageUrl = aboutData.imageUrl;

    if (file) { // Jika ada file baru yang dipilih
      const formData = new FormData();
      formData.append("images", file);
      try {
        const uploadRes = await axios.post("http://localhost:5000/api/upload", formData);
        imageUrl = uploadRes.data.imageUrls[0];
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Gagal mengunggah gambar baru.", "error");
        return;
      }
    }

    try {
      await axios.put("http://localhost:5000/api/about", {
        imageUrl,
        buttonUrl: aboutData.buttonUrl
      });
      Swal.fire("Sukses!", "Data halaman About berhasil disimpan.", "success");
      fetchAboutData();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Gagal menyimpan data.", "error");
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Kelola Halaman About</h1>

        {/* --- Card untuk Gambar --- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Gambar di Bagian "Siapa Kami"</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* --- Area Pratinjau --- */}
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-gray-500">
                  <ImageIcon size={48} className="mx-auto mb-2" />
                  <p>Pratinjau Gambar</p>
                </div>
              )}
            </div>

            {/* --- Area Kontrol Upload --- */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">
                Pilih gambar baru untuk diunggah. Gambar yang tersimpan saat ini akan digantikan.
              </p>
              <label className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition">
                <Upload size={20} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Pilih File...</span>
                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
              </label>
              {preview && (
                <button
                  onClick={handleRemoveImage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
                  title="Hapus gambar saat ini"
                >
                  <Trash2 size={18} />
                  Hapus Gambar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- Card untuk Tombol --- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tombol "Kontak Kami"</h2>
          <label htmlFor="buttonUrl" className="block text-sm font-medium text-gray-700 mb-2">
            URL Tujuan
          </label>
          <input
            id="buttonUrl"
            type="text"
            value={aboutData.buttonUrl}
            onChange={handleUrlChange}
            className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="Contoh: https://wa.me/628123456789"
          />
        </div>

        {/* --- Tombol Simpan --- */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-pink-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutAdmin;