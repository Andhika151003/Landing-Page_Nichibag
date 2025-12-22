import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusCircle,
  Edit,
  Trash2,
  Upload,
  X,
  ImageOff,
  Percent,
  Link as LinkIcon,
  Box,
  Weight,
  Ruler,
} from "lucide-react";
import Swal from "sweetalert2";

const colorNameToHex = {
  merah: "#ff0000",
  "merah hati": "#b22222",
  pink: "#ffc0cb",
  oranye: "#ffa500",
  kuning: "#ffff00",
  hijau: "#008000",
  "hijau daun": "#228b22",
  biru: "#0000ff",
  "biru laut": "#1e90ff",
  "biru langit": "#87ceeb",
  ungu: "#800080",
  coklat: "#a52a2a",
  hitam: "#000000",
  putih: "#ffffff",
  "abu-abu": "#808080",
  abu: "#808080",
  emas: "#ffd700",
  gold: "#ffd700",
  perak: "#c0c0c0",
  silver: "#c0c0c0",
  beige: "#f5f5dc",
};

const recommendedColors = [
  { name: "Merah", hex: "#ef4444" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Ungu", hex: "#a855f7" },
  { name: "Biru", hex: "#3b82f6" },
  { name: "Hijau", hex: "#22c55e" },
  { name: "Kuning", hex: "#eab308" },
  { name: "Oranye", hex: "#f97316" },
  { name: "Coklat", hex: "#845427" },
  { name: "Abu-abu", hex: "#6b7280" },
  { name: "Hitam", hex: "#000000" },
  { name: "Putih", hex: "#ffffff" },
  { name: "Light Beige", hex: "#F5F5DC" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Silver", hex: "#C0C0C0" },
];

const KelolaProduk = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" });
  const categories = [
    "Paper bag",
    "Gift box",
    "Gift card",
    "Ribbon",
    "Kotak sepatu",
  ];
  const [colorImageFiles, setColorImageFiles] = useState([]);
  const [colorImagePreviews, setColorImagePreviews] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      colorImagePreviews.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [colorImagePreviews]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      Swal.fire("Error", "Gagal memuat data produk.", "error");
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setIsEditing(true);
      setCurrentProduct({
        ...product,
        colors: product.colors || [],
        discountPercentage: product.discountPercentage || 0,
        orderLink: product.orderLink || "",
        weight: product.weight || 0,
        material: product.material || "",
        dimensions: product.dimensions || { length: 0, width: 0, height: 0 },
      });
    } else {
      setIsEditing(false);
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        productCode: "",
        category: categories[0],
        colors: [],
        discountPercentage: 0,
        orderLink: "",
        weight: 0,
        material: "",
        dimensions: { length: 0, width: 0, height: 0 },
      });
    }
    setIsModalOpen(true);
    setColorImageFiles([]);
    setColorImagePreviews([]);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("dimensions.")) {
      const field = name.split(".")[1];
      setCurrentProduct((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [field]: value },
      }));
    } else {
      setCurrentProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleColorNameChange = (e) => {
    const name = e.target.value;
    const lowerCaseName = name.toLowerCase().trim();
    const hex = colorNameToHex[lowerCaseName] || newColor.hex;
    setNewColor({ name: name, hex: hex });
  };

  const handleAddColor = async () => {
    if (!newColor.name || !newColor.hex || colorImageFiles.length === 0) {
      Swal.fire(
        "Peringatan",
        "Nama warna, kode hex, dan minimal satu gambar wajib diisi.",
        "warning"
      );
      return;
    }
    if (
      currentProduct.colors.some(
        (c) => c.name.toLowerCase() === newColor.name.trim().toLowerCase()
      )
    ) {
      Swal.fire("Peringatan", `Warna "${newColor.name}" sudah ada.`, "warning");
      return;
    }
    const formData = new FormData();
    for (const file of colorImageFiles) {
      formData.append("images", file);
    }
    try {
      const uploadRes = await axios.post(
        "http://127.0.0.1:5000/api/upload",
        formData
      );
      setCurrentProduct((prev) => ({
        ...prev,
        colors: [
          ...(prev.colors || []),
          { ...newColor, imageUrls: uploadRes.data.imageUrls },
        ],
      }));
      setNewColor({ name: "", hex: "#000000" });
      setColorImageFiles([]);
      setColorImagePreviews([]);
    } catch (error) {
      Swal.fire("Error", "Gagal meng-upload gambar untuk warna.", "error");
    }
  };

  const handleSelectRecommendedColor = (color) => {
    setNewColor({ name: color.name, hex: color.hex });
  };

  const handleRemoveColor = (nameToRemove) => {
    setCurrentProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color.name !== nameToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct.colors || currentProduct.colors.length === 0) {
      Swal.fire(
        "Peringatan",
        "Produk harus memiliki minimal satu varian warna.",
        "warning"
      );
      return;
    }
    const { images, ...productData } = currentProduct;
    console.log("Data yang akan dikirim ke backend:", productData);

    const url = isEditing
      ? `http://127.0.0.1:5000/products/${productData._id}`
      : "http://127.0.0.1:5000/products";
    const method = isEditing ? "put" : "post";
    try {
      await axios[method](url, productData);
      Swal.fire("Sukses!", `Produk berhasil disimpan.`, "success");
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      Swal.fire(
        "Error",
        `Gagal menyimpan produk: ${error.response?.data?.msg || error.message}`,
        "error"
      );
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Anda Yakin?",
      text: "Produk ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:5000/products/${id}`);
          Swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
          fetchProducts();
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus produk.", "error");
        }
      }
    });
  };

  const handleColorFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setColorImageFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setColorImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveColorImage = (index) => {
    URL.revokeObjectURL(colorImagePreviews[index]);
    setColorImageFiles((prev) => prev.filter((_, i) => i !== index));
    setColorImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Produk</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-600 transition"
        >
          <PlusCircle size={20} /> Tambah Produk
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 font-medium">
            <tr>
              <th className="p-4 text-left">Gambar</th>
              <th className="p-4 text-left">Nama Produk</th>
              <th className="p-4 text-left">Harga</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  {product.colors?.[0]?.imageUrls?.[0] ? (
                    <img
                      src={`http://127.0.0.1:5000${product.colors[0].imageUrls[0]}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      <ImageOff size={24} />
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 text-gray-800">
                  Rp{(product.price ?? 0).toLocaleString("id-ID")}
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-8 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAMA PRODUK & KODE PRODUK */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleChange}
                    placeholder="Nama Produk"
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="productCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Kode Produk
                  </label>
                  <input
                    type="text"
                    id="productCode"
                    name="productCode"
                    value={currentProduct.productCode}
                    onChange={handleChange}
                    placeholder="cth: NB-001"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              {/* KATEGORI */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-white"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* HARGA & DISKON */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Harga
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      Rp
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={currentProduct.price}
                      onChange={handleChange}
                      placeholder="Harga"
                      className="w-full p-3 pl-8 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="discountPercentage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Diskon (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="discountPercentage"
                      name="discountPercentage"
                      value={currentProduct.discountPercentage}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full p-3 pr-8 border rounded-lg"
                    />
                    <Percent
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* DESKRIPSI */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deskripsi Produk
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleChange}
                  placeholder="Deskripsi Produk"
                  className="w-full p-3 border rounded-lg"
                  rows="4"
                  required
                />
              </div>

              {/* DETAIL SPESIFIKASI */}
              <div className="space-y-4 pt-4 border-t">
                <label className="block text-base font-semibold text-gray-800">
                  Detail Spesifikasi
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="material"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bahan
                    </label>
                    <div className="relative">
                      <Box
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        id="material"
                        name="material"
                        value={currentProduct.material}
                        onChange={handleChange}
                        placeholder="cth: Kraft Paper"
                        className="w-full p-3 pl-10 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Berat (gram)
                    </label>
                    <div className="relative">
                      <Weight
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={currentProduct.weight}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full p-3 pl-10 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="dimensions_length"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Panjang (cm)
                    </label>
                    <div className="relative">
                      <Ruler
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="number"
                        id="dimensions_length"
                        name="dimensions.length"
                        value={currentProduct.dimensions.length}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full p-2 pl-9 border rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="dimensions_width"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Lebar (cm)
                    </label>
                    <div className="relative">
                      <Ruler
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="number"
                        id="dimensions_width"
                        name="dimensions.width"
                        value={currentProduct.dimensions.width}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full p-2 pl-9 border rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="dimensions_height"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tinggi (cm)
                    </label>
                    <div className="relative">
                      <Ruler
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="number"
                        id="dimensions_height"
                        name="dimensions.height"
                        value={currentProduct.dimensions.height}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full p-2 pl-9 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* LINK ORDER */}
              {/* <div>
                <label
                  htmlFor="orderLink"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link Button Order
                </label>
                <div className="relative">
                  <LinkIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="url"
                    id="orderLink"
                    name="orderLink"
                    value={currentProduct.orderLink}
                    onChange={handleChange}
                    placeholder="cth: https://wa.me/628..."
                    className="w-full p-3 pl-10 border rounded-lg"
                  />
                </div>
              </div> */}

              {/* KELOLA WARNA & GAMBAR VARIASI */}
              <div className="space-y-4 pt-4 border-t">
                <label className="block text-base font-semibold text-gray-800">
                  Kelola Warna & Gambar Variasi
                </label>
                <p className="text-sm text-gray-500 -mt-3">
                  Setiap produk harus memiliki minimal satu varian warna. Anda
                  bisa mengupload banyak gambar untuk satu warna.
                </p>
                <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pilih Warna</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={newColor.hex}
                          onChange={(e) =>
                            setNewColor({ ...newColor, hex: e.target.value })
                          }
                          className="h-10 w-12 p-1 rounded-md border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={newColor.name}
                          onChange={handleColorNameChange}
                          placeholder="Ketik Nama Warna"
                          className="p-2 border rounded-md w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Upload Gambar (bisa lebih dari 1)
                      </label>
                      <label className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:border-pink-500 h-10">
                        <Upload size={16} />
                        <span className="text-sm font-medium">
                          {colorImageFiles.length > 0
                            ? `${colorImageFiles.length} gambar dipilih`
                            : "Pilih Gambar"}
                        </span>
                        <input
                          type="file"
                          onChange={handleColorFileChange}
                          className="hidden"
                          accept="image/*"
                          multiple
                        />
                      </label>
                    </div>
                  </div>

                  {colorImagePreviews.length > 0 && (
                    <div>
                      <label className="text-sm font-medium">Pratinjau:</label>
                      <div className="mt-2 flex flex-wrap gap-2 border p-2 rounded-md bg-white">
                        {colorImagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-20 h-20 rounded-md object-cover border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveColorImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-600">
                    <p className="mb-2">Pilih dari rekomendasi:</p>
                    <div className="flex flex-wrap gap-2">
                      {recommendedColors.map((color) => (
                        <button
                          type="button"
                          key={color.name}
                          onClick={() => handleSelectRecommendedColor(color)}
                          className="flex items-center gap-2 px-3 py-1 border rounded-full hover:bg-gray-100 transition"
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-gray-400"
                            style={{ backgroundColor: color.hex }}
                          ></span>
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-800 transition-all"
                  >
                    Tambah Varian Warna
                  </button>
                </div>

                {currentProduct.colors.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Varian Tersimpan:
                    </label>
                    {currentProduct.colors.map((color) => (
                      <div
                        key={color.name} // Gunakan color.name sebagai key
                        className="flex items-start gap-3 p-3 bg-white border rounded-lg"
                      >
                        <div className="flex-shrink-0 flex flex-col items-center gap-1 w-20">
                          <div
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <span className="text-xs text-center break-words">
                            {color.name}
                          </span>
                        </div>
                        <div className="flex-grow flex flex-wrap gap-2">
                          {color.imageUrls.map((url, imgIndex) => (
                            <img
                              key={`${color.name}-${imgIndex}`} // Buat key yang lebih unik
                              src={`http://127.0.0.1:5000${url}`}
                              alt={`${color.name}-${imgIndex}`}
                              className="w-16 h-16 object-cover rounded-md border"
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(color.name)} // Hapus berdasarkan nama
                          className="text-gray-400 hover:text-red-500 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaProduk;
