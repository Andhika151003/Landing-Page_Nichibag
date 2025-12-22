// Server/controller/ProductController.js

import Product from "../models/Product.js";
import Log from "../models/LogActivity.js";

// Mengambil semua produk
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Gagal mengambil data produk", error: error.message });
  }
};

// Mengambil satu produk berdasarkan ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Gagal mengambil data produk", error: error.message });
  }
};

// --- FUNGSI HELPER: Membersihkan Data Sebelum Disimpan ---
const cleanProductData = (data) => {
  const cleanData = { ...data };

  // 1. Handle productCode:
  // Jika string kosong ("") atau hanya spasi, HAPUS field ini dari object.
  // Ini penting agar fitur 'sparse: true' di MongoDB bekerja (mengizinkan banyak produk tanpa kode).
  if (!cleanData.productCode || cleanData.productCode.trim() === "") {
    delete cleanData.productCode;
  } else {
    // Jika ada isinya, pastikan di-trim
    cleanData.productCode = cleanData.productCode.trim();
  }

  // 1b. Handle productID (TAMBAHAN FIX):
  // Hapus field productID jika kosong/null untuk menghindari duplicate key error
  if (!cleanData.productID || cleanData.productID === "" || cleanData.productID === null) {
    delete cleanData.productID;
  }

  // 2. Handle Angka: Ubah string kosong "" menjadi 0 agar tidak Error Casting
  const numberFields = ['price', 'weight', 'discountPercentage'];
  numberFields.forEach(field => {
    if (cleanData[field] === "" || cleanData[field] === null || cleanData[field] === undefined) {
      cleanData[field] = 0;
    }
  });

  // 3. Handle Dimensions (Nested Object)
  // Pastikan object dimensions ada sebelum mengakses propertinya
  if (cleanData.dimensions) {
    if (cleanData.dimensions.length === "") cleanData.dimensions.length = 0;
    if (cleanData.dimensions.width === "") cleanData.dimensions.width = 0;
    if (cleanData.dimensions.height === "") cleanData.dimensions.height = 0;
  }

  return cleanData;
};

// CREATE (Diperbaiki untuk Error 400 & 500)
export const createProduct = async (req, res) => {
  const user = req.body?.user || "Admin"; 
  
  try {
    // Bersihkan data sebelum disimpan
    const productData = cleanProductData(req.body);

    const product = await Product.create(productData);
    
    await Log.create({
      user,
      action: "create",
      type: "Product",
      status: "success",
    });
    // Menggunakan 'msg' agar terbaca di Frontend
    res.status(201).json({ msg: "Produk berhasil dibuat", data: product });

  } catch (err) {
    console.error("Create Product Error:", err); // Cek terminal VScode untuk detail error

    // Log ke database (dibungkus try-catch agar aman)
    try {
        await Log.create({ user, action: "create", type: "Product", status: "failed" });
    } catch (e) { console.error("Log failed:", e); }

    // --- PENANGANAN ERROR SPESIFIK ---
    
    // 1. Error Duplikat (Kode Produk Sudah Ada atau productID null)
    if (err.code === 11000) {
        // Cek field mana yang duplikat
        const field = Object.keys(err.keyPattern)[0];
        
        // Handle error productID null khusus
        if (field === 'productID' && err.keyValue.productID === null) {
            return res.status(400).json({ 
                msg: "Error: Field productID menyebabkan konflik. Silakan hapus index productID_1 dari MongoDB atau kosongkan field ini." 
            });
        }
        
        const errorMsg = field === 'productCode' 
            ? `Kode Produk "${err.keyValue.productCode}" sudah digunakan. Ganti kode lain atau kosongkan.`
            : `Data duplikat pada field: ${field}`;
            
        return res.status(400).json({ msg: errorMsg });
    }

    // 2. Error Validasi (Misal ada data wajib yang kosong)
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ msg: `Validasi Gagal: ${messages.join(', ')}` });
    }

    // 3. Error Lainnya (Server Error)
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE (Diperbaiki untuk Error 400 & 500)
export const updateProduct = async (req, res) => {
  const user = req.body?.user || "Admin";
  
  try {
    // Bersihkan data sebelum update
    const productData = cleanProductData(req.body);

    const updated = await Product.findByIdAndUpdate(req.params.id, productData, {
      new: true,
      runValidators: true // Pastikan validasi schema berjalan saat update
    });

    if (!updated) {
      return res.status(404).json({ msg: "Produk tidak ditemukan untuk diupdate." });
    }

    await Log.create({
      user,
      action: "update",
      type: "Product",
      status: "success",
    });
    res.json(updated);

  } catch (err) {
    console.error("Update Product Error:", err);
    
    try {
        await Log.create({ user, action: "update", type: "Product", status: "failed" });
    } catch (e) { console.error("Log failed:", e); }

    // 1. Error Duplikat
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        
        // Handle error productID null khusus
        if (field === 'productID' && err.keyValue.productID === null) {
            return res.status(400).json({ 
                msg: "Error: Field productID menyebabkan konflik. Silakan hapus index productID_1 dari MongoDB." 
            });
        }
        
        return res.status(400).json({ msg: "Kode Produk sudah digunakan oleh produk lain." });
    }

    // 2. Error Validasi
    if (err.name === 'ValidationError') {
        return res.status(400).json({ msg: err.message });
    }

    res.status(500).json({ msg: err.message });
  }
};

// DELETE (Tetap, hanya sesuaikan msg)
export const deleteProduct = async (req, res) => {
  const user = "Admin"; 
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      await Log.create({
        user,
        action: "delete",
        type: "Product",
        status: "failed",
      });
      return res.status(404).json({ msg: "Produk tidak ditemukan untuk dihapus." });
    }

    await Log.create({
      user,
      action: "delete",
      type: "Product",
      status: "success",
    });
    res.json({ msg: "Product deleted" });
  } catch (err) {
    await Log.create({
      user,
      action: "delete",
      type: "Product",
      status: "failed",
    });
    res.status(500).json({ msg: err.message });
  }
};