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
} from "lucide-react";
import Swal from "sweetalert2";

// Daftar warna rekomendasi
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

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/products");
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
                images: product.images || [], // Tetap ada untuk konsistensi struktur
                colors: product.colors || [],
                discountPercentage: product.discountPercentage || 0,
                orderLink: product.orderLink || "",
            });
        } else {
            setIsEditing(false);
            setCurrentProduct({
                name: "",
                description: "",
                price: "",
                productCode: "",
                category: categories[0],
                images: [], // Tetap ada untuk konsistensi struktur
                colors: [],
                discountPercentage: 0,
                orderLink: "",
            });
        }
        setIsModalOpen(true);
        setColorImageFiles([]);
        setColorImagePreviews([]);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Fungsi ini tidak terpakai tapi dibiarkan agar tidak mengubah struktur
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (!files.length) return;
        const formData = new FormData();
        for (const file of files) formData.append("images", file);
        try {
            const res = await axios.post("http://localhost:5000/api/upload", formData);
            setCurrentProduct((prev) => ({
                ...prev,
                images: [...(prev.images || []), ...(res.data?.imageUrls || [])],
            }));
        } catch (error) {
            Swal.fire("Error", "Gagal mengupload gambar.", "error");
        }
    };

    // Fungsi ini tidak terpakai tapi dibiarkan agar tidak mengubah struktur
    const handleRemoveImage = (index) =>
        setCurrentProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));

    const handleAddColor = async () => {
        if (!newColor.name || !newColor.hex || colorImageFiles.length === 0) {
            Swal.fire("Peringatan", "Nama warna, kode hex, dan minimal satu gambar wajib diisi.", "warning");
            return;
        }

        const isDuplicate = currentProduct.colors.some(
            (color) => color.name.toLowerCase() === newColor.name.trim().toLowerCase()
        );

        if (isDuplicate) {
            Swal.fire("Peringatan", `Warna "${newColor.name}" sudah ada.`, "warning");
            return;
        }

        const formData = new FormData();
        for (const file of colorImageFiles) {
            formData.append("images", file);
        }

        try {
            // Upload semua gambar sekaligus
            const uploadRes = await axios.post("http://localhost:5000/api/upload", formData);
            const imageUrls = uploadRes.data.imageUrls; // Ini sudah berupa array

            setCurrentProduct((prev) => ({
                ...prev,
                colors: [...(prev.colors || []), { ...newColor, imageUrls }],
            }));

            // Reset form warna
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

    const handleRemoveColor = (index) =>
        setCurrentProduct((prev) => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index),
        }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        // PERBAIKAN 2: Validasi agar produk tidak disimpan tanpa warna/gambar
        if (!currentProduct.colors || currentProduct.colors.length === 0) {
            Swal.fire("Peringatan", "Produk harus memiliki minimal satu varian warna.", "warning");
            return;
        }
        
        const { images, ...productData } = currentProduct;
        
        const url = isEditing ? `http://localhost:5000/products/${productData._id}` : "http://localhost:5000/products";
        const method = isEditing ? 'put' : 'post';

        try {
            await axios[method](url, productData);
            Swal.fire("Sukses!", `Produk berhasil disimpan.`, "success");
            fetchProducts();
            handleCloseModal();
        } catch (error) {
            Swal.fire("Error", `Gagal menyimpan produk: ${error.response?.data?.msg || error.message}`, "error");
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
                    await axios.delete(`http://localhost:5000/products/${id}`);
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
            setColorImageFiles(files);
            const previews = files.map(file => URL.createObjectURL(file));
            setColorImagePreviews(previews);
        }
    };

    return (
      // ... sisa JSX return Anda tidak berubah sama sekali ...
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
  {product.colors && product.colors.length > 0 && product.colors[0].imageUrls.length > 0 ? (
    <img 
      src={`http://localhost:5000${product.colors[0].imageUrls[0]}`} 
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
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleChange}
                  placeholder="Nama Produk"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="productCode"
                  value={currentProduct.productCode}
                  onChange={handleChange}
                  placeholder="Kode Produk (cth: NB-001)"
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <select
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleChange}
                    placeholder="Harga"
                    className="w-full p-3 pl-8 border rounded-lg"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="discountPercentage"
                    value={currentProduct.discountPercentage}
                    onChange={handleChange}
                    placeholder="Diskon"
                    className="w-full p-3 pr-8 border rounded-lg"
                  />
                  <Percent
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <textarea
                name="description"
                value={currentProduct.description}
                onChange={handleChange}
                placeholder="Deskripsi Produk"
                className="w-full p-3 border rounded-lg"
                rows="4"
                required
              />

              {/* Input Link Pesan Sekarang */}
              <div className="relative">
                <input
                  type="url"
                  name="orderLink"
                  value={currentProduct.orderLink}
                  onChange={handleChange}
                  placeholder="Link Pesan Sekarang (cth: https://wa.me/628...)"
                  className="w-full p-3 pl-10 border rounded-lg"
                />
                <LinkIcon
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Kelola Warna */}
              {/* Kelola Warna & Gambar Variasi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kelola Warna & Gambar Variasi
                </label>

                {/* Input untuk warna baru */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 border rounded-lg">
                  <input
                    type="color"
                    value={newColor.hex}
                    onChange={(e) =>
                      setNewColor({ ...newColor, hex: e.target.value })
                    }
                    className="h-10 w-full p-1 rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    value={newColor.name}
                    onChange={(e) =>
                      setNewColor({ ...newColor, name: e.target.value })
                    }
                    placeholder="Nama Warna"
                    className="p-2 border rounded-md"
                  />
                  <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:border-pink-500">
                    <Upload size={16} />
                    <span className="text-sm">
                      {colorImageFiles.length > 0 ? `${colorImageFiles.length} Gambar` : "Pilih Gambar"}
                    </span>
                    <input
                      type="file"
                      onChange={handleColorFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
                {colorImagePreviews.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {colorImagePreviews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-16 h-16 rounded-md object-cover border"/>
                        ))}
                    </div>
                )}
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="mt-2 bg-gray-200 px-4 py-2 rounded-md font-semibold text-sm hover:bg-gray-300"
                >
                  Tambah Warna
                </button>

                {/* Rekomendasi Warna */}
                <div className="mt-3 text-sm text-gray-600">
                  <p className="mb-2">
                    Pilih dari rekomendasi (untuk mengisi otomatis):
                  </p>
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

                {/* Daftar warna yang sudah ditambahkan */}
                <div className="flex flex-wrap gap-4 mt-4">
                  {currentProduct.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <img
                        src={`http://localhost:5000${color.imageUrl}`}
                        alt={color.name}
                        className="w-20 h-20 rounded-lg object-cover border"
                      />
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-xs">
                        <span
                          className="w-3 h-3 rounded-full border border-gray-400"
                          style={{ backgroundColor: color.hex }}
                        ></span>
                        <span className="max-w-[80px] truncate">
                          {color.name}
                        </span>
                        <div className="flex-grow flex flex-wrap gap-2">
                                {/* 👇 PERBAIKAN 3: Gunakan imageUrls */}
                                {color.imageUrls.map((url, imgIndex) => (
                                    <img key={imgIndex} src={`http://localhost:5000${url}`} alt={`${color.name}-${imgIndex}`} className="w-16 h-16 object-cover rounded-md border"/>
                                ))}
                            </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(index)}
                        >
                          <X
                            size={14}
                            className="text-gray-500 hover:text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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