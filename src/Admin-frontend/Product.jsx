import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusCircle, Edit, Trash2, Upload, X } from "lucide-react";
import Swal from 'sweetalert2';

const KelolaProduk = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  const categories = ["Paper bag", "Gift box", "Gift card", "Ribbon", "Kotak sepatu"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const getErrorMessage = (error) => {
    // Fungsi bantuan untuk mendapatkan pesan error yang lebih baik
    return error.response?.data?.msg || error.message || "Terjadi kesalahan yang tidak diketahui.";
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      // PERBAIKAN: Pastikan data yang diterima adalah array untuk mencegah error .map
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]); // Fallback ke array kosong jika data tidak valid
        console.error("Data produk yang diterima bukan array:", res.data);
      }
    } catch (error) {
      Swal.fire("Error", `Gagal memuat data produk: ${getErrorMessage(error)}`, "error");
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setIsEditing(true);
      setCurrentProduct({ ...product, images: product.images || [] }); // Pastikan images adalah array
    } else {
      setIsEditing(false);
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        category: categories[0],
        images: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }

    try {
        const res = await axios.post("http://localhost:5000/api/upload", formData);
        // PERBAIKAN: Pastikan res.data.imageUrls adalah array
        const newImageUrls = Array.isArray(res.data?.imageUrls) ? res.data.imageUrls : [];
        setCurrentProduct(prev => ({
            ...prev,
            images: [...(prev.images || []), ...newImageUrls]
        }));
    } catch (error) {
        Swal.fire("Error", `Gagal mengupload gambar: ${getErrorMessage(error)}`, "error");
    }
  };
  
  const handleRemoveImage = (indexToRemove) => {
      setCurrentProduct(prev => ({
          ...prev,
          images: prev.images.filter((_, index) => index !== indexToRemove)
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    const url = isEditing 
        ? `http://localhost:5000/products/${currentProduct._id}` 
        : "http://localhost:5000/products";
    const method = isEditing ? 'put' : 'post';

    try {
      await axios[method](url, currentProduct);
      Swal.fire("Sukses!", `Produk berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}.`, "success");
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      Swal.fire("Error", `Gagal menyimpan produk: ${getErrorMessage(error)}`, "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Anda Yakin?',
      text: "Produk yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, hapus!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/products/${id}`);
          Swal.fire('Terhapus!', 'Produk berhasil dihapus.', 'success');
          fetchProducts();
        } catch (error) {
          Swal.fire("Error", `Gagal menghapus produk: ${getErrorMessage(error)}`, "error");
        }
      }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Produk</h1>
        <button onClick={() => handleOpenModal()} className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-600 transition">
          <PlusCircle size={20} /> Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 font-medium">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Gambar</th>
              <th className="p-4 text-left">Nama Produk</th>
              <th className="p-4 text-left">Kategori</th>
              <th className="p-4 text-left">Harga</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product?._id || index} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <img 
                    
                    src={product?.images?.[0] ? `http://localhost:5000${product.images[0]}` : 'https://via.placeholder.com/150'} 
                    alt={product?.name || 'Gambar Produk'} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-4 font-medium">{product?.name ?? 'Nama Tidak Tersedia'}</td>
                <td className="p-4 text-gray-600">{product?.category ?? '-'}</td>
                {/* PERBAIKAN: Format harga dengan aman, beri nilai default 0 jika null/undefined */}
                <td className="p-4 text-gray-800">Rp{(product?.price ?? 0).toLocaleString("id-ID")}</td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-3">
                    <button onClick={() => handleOpenModal(product)} className="text-blue-500 hover:text-blue-700 transition" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(product?._id)} className="text-red-500 hover:text-red-700 transition" title="Hapus">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? "Edit Produk" : "Tambah Produk Baru"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" value={currentProduct.name} onChange={handleChange} placeholder="Nama Produk" className="w-full p-3 border rounded-lg" required />
              <textarea name="description" value={currentProduct.description} onChange={handleChange} placeholder="Deskripsi Produk" className="w-full p-3 border rounded-lg" rows="4" required />
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">Rp</span>
                <input type="number" name="price" value={currentProduct.price} onChange={handleChange} placeholder="Harga" className="w-full p-3 pl-8 border rounded-lg" required />
              </div>
              <select name="category" value={currentProduct.category} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white" required>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:border-pink-500 hover:bg-pink-50">
                      <Upload size={20} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">Pilih & Upload File</span>
                      <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" multiple />
                  </label>
                </div>
              </div>

              {/* PERBAIKAN: Gunakan optional chaining untuk mapping gambar */}
              {(currentProduct?.images?.length ?? 0) > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-2">
                    {currentProduct.images.map((imgUrl, index) => (
                        <div key={index} className="relative">
                            <img src={`http://localhost:5000${imgUrl}`} alt={`Product image ${index+1}`} className="w-full h-24 object-cover rounded-lg" />
                            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={14}/></button>
                        </div>
                    ))}
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300">Batal</button>
                <button type="submit" className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaProduk;