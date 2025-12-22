// src/Admin-frontend/KelolaHome.jsx

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Upload,
  Save,
  X,
  Pencil,
  ShoppingBag,
  CheckCircle,
  Layers, // Icon untuk kategori
} from "lucide-react";
import Swal from "sweetalert2";

// Set default baseURL
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
        resolve(ratio > 1.7 && ratio < 1.8);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// ================== SECTION MANAGER ==================
const SectionManager = ({ title, items, onDelete, onAdd, onEdit, limit, catalogProducts = [] }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // State Form
  const [itemName, setItemName] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  
  // State Pilihan
  const [selectedCatalogId, setSelectedCatalogId] = useState(""); // Untuk Produk Terlaris
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // Untuk Kategori Unggulan

  // State Edit Mode
  const [editingId, setEditingId] = useState(null); 
  const [currentImageUrl, setCurrentImageUrl] = useState(""); 

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Flag Helper
  const isProductSection = title === "Produk Terlaris";
  const isCategorySection = title === "Kategori Unggulan"; // Flag Baru

  // --- LOGIC EKSTRAK KATEGORI UNIK ---
  // Mengambil list kategori unik dari seluruh produk yang ada
  const uniqueCategories = React.useMemo(() => {
    if (!catalogProducts || catalogProducts.length === 0) return [];
    // Ambil field 'category', filter yg kosong, dan buat unique via Set
    const cats = catalogProducts.map(p => p.category).filter(c => c);
    return [...new Set(cats)];
  }, [catalogProducts]);

  useEffect(() => {
    return () => {
      if (preview && file) URL.revokeObjectURL(preview);
    };
  }, [preview, file]);

  // --- LOGIC SINKRONISASI DROPDOWN SAAT EDIT ---
  useEffect(() => {
    if (editingId && catalogProducts.length > 0) {
        if (isProductSection && itemLink.includes("/product/")) {
            const parts = itemLink.split("/product/");
            const idFromLink = parts[parts.length - 1].trim(); 
            const exists = catalogProducts.find(p => p._id === idFromLink);
            if (exists) setSelectedCatalogId(idFromLink);
        }
        // Sinkronisasi Edit Kategori
        else if (isCategorySection) {
            // Kita asumsikan itemName adalah nama kategorinya
            const exists = uniqueCategories.find(c => c === itemName);
            if (exists) setSelectedCategoryName(itemName);
        }
    }
  }, [editingId, itemLink, catalogProducts, isProductSection, isCategorySection, itemName, uniqueCategories]);


  // --- HANDLER PILIH PRODUK (UNTUK PRODUK TERLARIS) ---
  const handleCatalogSelect = (e) => {
    const prodId = e.target.value;
    setSelectedCatalogId(prodId);

    if (prodId) {
        const product = catalogProducts.find(p => p._id === prodId);
        if (product) {
            setItemName(product.nama || product.name || "");
            setPrice(product.price || 0);
            setItemLink(`/product/${product._id}`);
            setDiscountPercentage(product.discountPercentage || 0);

            const hasImage = product.colors && product.colors.length > 0 && product.colors[0].imageUrls?.[0];

            if (hasImage) {
                const imgPath = product.colors[0].imageUrls[0];
                setCurrentImageUrl(imgPath);
                setPreview(`http://127.0.0.1:5000${imgPath}`);
            } else {
                setCurrentImageUrl("");
                setPreview(null);
            }
            setFile(null);
        }
    } else {
        setSelectedCatalogId("");
    }
  };

  // --- HANDLER PILIH KATEGORI (BARU) ---
  const handleCategorySelect = (e) => {
    const catName = e.target.value;
    setSelectedCategoryName(catName);

    if (catName) {
        // 1. Set Nama Item sesuai Kategori
        setItemName(catName);

        // 2. Set Link otomatis ke halaman filter kategori (sesuaikan dengan routing frontend user anda)
        // Contoh: /katalog?category=PaperBag
        setItemLink(`/katalog?category=${encodeURIComponent(catName)}`);

        // 3. Cari satu produk di kategori ini untuk diambil gambarnya
        const productRepresentative = catalogProducts.find(
            p => p.category === catName && 
            p.colors && p.colors.length > 0 && 
            p.colors[0].imageUrls?.[0]
        );

        if (productRepresentative) {
            const imgPath = productRepresentative.colors[0].imageUrls[0];
            setCurrentImageUrl(imgPath);
            setPreview(`http://127.0.0.1:5000${imgPath}`);
        } else {
            // Jika kategori ada tapi tidak ada produk yang punya gambar
            setCurrentImageUrl("");
            setPreview(null);
        }
        setFile(null); // Reset upload manual
    } else {
        setSelectedCategoryName("");
    }
  };

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
    setCurrentImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    if (preview && file) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setItemName("");
    setItemLink("");
    setPrice("");
    setDiscountPercentage("");
    setEditingId(null);
    setCurrentImageUrl("");
    setSelectedCatalogId("");
    setSelectedCategoryName(""); // Reset pilihan kategori
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setItemName(item.nama || "");
    setItemLink(item.link || "");
    
    if (item.price !== undefined && item.price !== null) setPrice(item.price);
    else setPrice("");

    if (item.discountPercentage) setDiscountPercentage(item.discountPercentage);
    else setDiscountPercentage("");

    if (item.url) {
        setPreview(`http://127.0.0.1:5000${item.url}`);
        setCurrentImageUrl(item.url);
    } else {
        setPreview(null);
        setCurrentImageUrl("");
    }
    
    setFile(null); 

    setTimeout(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
  };

  const handleSubmit = async () => {
    if (!editingId && !file && !currentImageUrl) {
      return Swal.fire("Peringatan", "Data belum lengkap atau gambar kosong.", "warning");
    }

    let finalImageUrl = currentImageUrl; 

    try {
      Swal.fire({
        title: editingId ? "Menyimpan Perubahan..." : "Menyimpan...",
        text: "Sedang memproses data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      if (file) {
        const formData = new FormData();
        formData.append("images", file);
        const uploadRes = await axios.post("/api/upload", formData);
        finalImageUrl = uploadRes.data.imageUrls[0];
      }

      const itemData = {
        nama: String(itemName || (editingId ? itemName : "Item Baru")),
        url: String(finalImageUrl || ""),
        link: String(itemLink || ""),
      };

      if (isProductSection) {
        const normalPrice = parseFloat(price);
        const discount = parseFloat(discountPercentage);

        itemData.price = !isNaN(normalPrice) ? normalPrice : 0;

        if (!isNaN(normalPrice) && !isNaN(discount) && discount > 0) {
          itemData.discountPrice = normalPrice - normalPrice * (discount / 100);
          itemData.discountPercentage = discount;
        } else {
          itemData.discountPrice = null;
          itemData.discountPercentage = 0; 
        }
      }

      if (editingId) {
        // FIX: Pastikan props onEdit dipanggil
        if (onEdit) await onEdit(editingId, itemData);
        Swal.fire("Sukses!", "Data berhasil diperbarui.", "success");
      } else {
        await onAdd(itemData);
        Swal.fire("Sukses!", "Data berhasil disimpan.", "success");
      }

      resetForm();
    } catch (error) {
      console.error("Error submit:", error);
      Swal.fire("Error", error.response?.data?.message || "Gagal memproses data.", "error");
    }
  };

  const isLimitReached = !editingId && items.length >= limit;
  
  return (
    <section
      className={`mb-10 p-6 rounded-lg shadow-md transition-colors ${
        editingId ? "bg-blue-50 border border-blue-200" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {title}{" "}
          {editingId && <span className="text-blue-600 text-sm">(Mode Edit)</span>}
        </h3>
        <span className={`text-sm font-medium ${isLimitReached ? "text-red-500" : "text-gray-500"}`}>
          {items.length}/{limit}
        </span>
      </div>

      {/* Grid List Item */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {items.map((item) => (
          <div
            key={item._id}
            className={`relative group border rounded-lg overflow-hidden bg-gray-50 ${
              editingId === item._id ? "ring-4 ring-blue-400" : ""
            }`}
          >
            <img
              src={`http://127.0.0.1:5000${item.url}`}
              alt={item.nama || "item"}
              className="w-full h-32 object-cover"
            />
            <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEditing(item)}
                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 shadow-sm"
                title="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow-sm"
                title="Hapus"
              >
                <Trash2 size={14} />
              </button>
            </div>
            {item.nama && (
              <p className="text-center text-xs mt-2 font-medium p-1 truncate text-gray-700">
                {item.nama}
              </p>
            )}
          </div>
        ))}
      </div>

      <div ref={formRef} className="p-4 border-t relative bg-gray-50 rounded-md">
        {editingId && (
          <div className="mb-4 bg-blue-100 text-blue-800 px-4 py-2 rounded flex justify-between items-center">
            <span className="text-sm font-semibold">Mode Edit Aktif</span>
            <button onClick={resetForm} className="text-sm underline hover:text-blue-900">
              Batalkan
            </button>
          </div>
        )}

        {/* ================= FORM INPUT AREA ================= */}

        {/* KASUS 1: PRODUK TERLARIS (DROPDOWN PRODUK) */}
        {isProductSection ? (
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <ShoppingBag size={18} className="text-pink-600"/> 
                        Pilih Produk dari Katalog
                    </label>
                    <select
                        value={selectedCatalogId}
                        onChange={handleCatalogSelect}
                        className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-pink-300 outline-none transition"
                        disabled={isLimitReached && !editingId}
                    >
                        <option value="">-- Klik Disini untuk Memilih Produk --</option>
                        {catalogProducts.map((prod) => (
                            <option key={prod._id} value={prod._id}>
                                {prod.nama || prod.name} — Rp {(prod.price || 0).toLocaleString('id-ID')}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        ) 
        
        /* KASUS 2: KATEGORI UNGGULAN (DROPDOWN KATEGORI) */
        : isCategorySection ? (
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Layers size={18} className="text-purple-600"/> 
                        Pilih Kategori Produk
                    </label>
                    <select
                        value={selectedCategoryName}
                        onChange={handleCategorySelect}
                        className="w-full p-2.5 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-300 outline-none transition"
                        disabled={isLimitReached && !editingId}
                    >
                        <option value="">-- Pilih Kategori yang Tersedia --</option>
                        {uniqueCategories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                        *Gambar akan diambil secara otomatis dari salah satu produk dalam kategori tersebut.
                    </p>
                </div>
            </div>
        )

        /* KASUS 3: CAROUSEL / MANUAL */
        : (
            <div className="flex flex-col gap-4">
                {title !== "Gambar Carousel" && (
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Item</label>
                        <input
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder="Nama Kategori/Item"
                            className="w-full p-2 border rounded-md bg-white"
                            disabled={isLimitReached && !editingId}
                        />
                    </div>
                )}
                
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link Tujuan (Opsional)</label>
                    <input
                        type="text"
                        value={itemLink}
                        onChange={(e) => setItemLink(e.target.value)}
                        placeholder="Contoh: /katalog"
                        className="w-full p-2 border rounded-md bg-white"
                        disabled={isLimitReached && !editingId}
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {editingId ? "Ganti Gambar" : "Upload Gambar"}
                    </label>
                    <label className={`flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border-2 border-dashed rounded-md h-[42px] cursor-pointer hover:border-pink-500`}>
                        <Upload size={20} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">
                            {file ? file.name : "Pilih File Gambar"}
                        </span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                            disabled={isLimitReached && !editingId}
                        />
                    </label>
                </div>
            </div>
        )}

        {/* PREVIEW UMUM UNTUK SEMUA TIPE (JIKA SUDAH DIPILIH) */}
        {(isProductSection || isCategorySection) && (selectedCatalogId || selectedCategoryName || editingId) && preview && (
            <div className="mt-4 bg-white p-4 rounded-lg border border-green-200 shadow-sm flex items-start gap-4">
                <div className="w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden bg-gray-100">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800">{itemName || "Nama Item"}</h4>
                    
                    {/* Info Tambahan Khusus Produk */}
                    {isProductSection && (
                        <>
                            <p className="text-sm text-pink-600 font-semibold">
                                Rp {(!isNaN(parseFloat(price)) ? parseFloat(price) : 0).toLocaleString('id-ID')}
                            </p>
                            {(parseFloat(discountPercentage) > 0) && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded mt-1 inline-block">
                                    Diskon {discountPercentage}%
                                </span>
                            )}
                        </>
                    )}

                    {/* Info Tambahan Khusus Kategori */}
                    {isCategorySection && (
                        <p className="text-xs text-gray-500 mt-1">
                            Link: {itemLink}
                        </p>
                    )}

                    <div className="mt-2 text-xs text-green-700 flex items-center gap-1">
                        <CheckCircle size={12}/> Siap ditampilkan
                    </div>
                </div>
                {/* Tombol Reset hanya menghapus pilihan form, bukan menghapus data di DB */}
                <button onClick={resetForm} className="text-gray-400 hover:text-red-500 p-1">
                    <X size={18}/>
                </button>
            </div>
        )}

        {/* TOMBOL SIMPAN */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSubmit}
            disabled={(isLimitReached && !editingId) || (!file && !currentImageUrl && !editingId)}
            className={`w-auto px-6 py-2 rounded-md flex items-center justify-center gap-2 text-white transition shadow-md
                ${
                  editingId
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-pink-500 hover:bg-pink-600"
                }
                disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed`}
          >
            {editingId ? <Save size={16} /> : <Plus size={16} />}
            {editingId ? "Simpan Perubahan" : "Simpan ke Home"}
          </button>
        </div>

        {title === "Gambar Carousel" && (
          <p className="text-xs text-gray-500 mt-2 text-left">
            *Rekomendasi rasio gambar 16:9.
          </p>
        )}
      </div>
    </section>
  );
};

// ================== MAIN COMPONENT ==================
const KelolaHome = (props) => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Data Katalog
  const [catalogProducts, setCatalogProducts] = useState([]);

  const fetchData = async () => {
    // 1. Ambil Data Layout Home
    try {
      const [carouselRes, featuredRes, categoryRes] =
        await Promise.all([
          axios.get("/home/carousel"),
          axios.get("/home/featured-products"),
          axios.get("/home/categories"),
        ]);
      
      setCarouselImages(carouselRes.data);
      setFeaturedProducts(featuredRes.data);
      setCategories(categoryRes.data);
    } catch (error) {
      console.error("Gagal memuat data layout Home:", error);
    }

    // 2. Ambil Data Produk (Terpisah)
    try {
        const productRes = await axios.get("/products");
        setCatalogProducts(productRes.data);
    } catch (error) {
        console.error("Gagal memuat katalog produk:", error);
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
          await fetchData();
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
      await fetchData(); 
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = async (type, id, data) => {
    try {
      await axios.put(`/home/${type}/${id}`, data);
      await fetchData(); 
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen" {...props}>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">
        Kelola Halaman Utama
      </h2>

      <SectionManager
        title="Gambar Carousel"
        items={carouselImages}
        onDelete={(id) => handleDelete("carousel", id)}
        onAdd={(data) => handleAdd("carousel", data)}
        onEdit={(id, data) => handleEdit("carousel", id, data)} 
        limit={4}
      />

      <SectionManager
        title="Produk Terlaris"
        items={featuredProducts}
        onDelete={(id) => handleDelete("featured-products", id)}
        onAdd={(data) => handleAdd("featured-products", data)}
        onEdit={(id, data) => handleEdit("featured-products", id, data)} 
        limit={6}
        catalogProducts={catalogProducts}
      />

      <SectionManager
        title="Kategori Unggulan"
        items={categories}
        onDelete={(id) => handleDelete("categories", id)}
        onAdd={(data) => handleAdd("categories", data)}
        onEdit={(id, data) => handleEdit("categories", id, data)} 
        limit={6}
        // Kita oper juga catalogProducts ke sini agar bisa mendeteksi kategori unik
        catalogProducts={catalogProducts}
      />
    </div>
  );
};

export default KelolaHome;