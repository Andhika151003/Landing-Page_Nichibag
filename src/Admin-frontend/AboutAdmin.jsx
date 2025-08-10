import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutPage = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  // Ambil gambar dari database
  useEffect(() => {
    axios.get("http://localhost:5000/images")
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  // Upload gambar ke backend
  const handleUpload = async () => {
    if (!file) return alert("Pilih gambar dulu!");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setImages([...images, res.data]); // Tambah ke state
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 px-6 lg:px-20 py-10">
        {/* About Section */}
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Us
          </label>
          <textarea
            rows={3}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder=""
          ></textarea>
        </div>

        {/* Upload Section */}
        <h2 className="text-2xl font-semibold mb-4">Kelola Gambar</h2>
        <div className="border-2 border-dashed border-red-200 rounded-lg p-6 text-center mb-8">
          <p className="text-gray-500 mb-4">Upload Gambar</p>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Upload
          </button>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <img
              key={img._id}
              src={img.url}
              alt={img.filename}
              className="rounded-lg w-full h-60 object-cover"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
