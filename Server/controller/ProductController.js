import mongoose from "mongoose";
import Product from "../models/Product.js";

// Mengambil semua produk
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Diurutkan dari yang terbaru
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Membuat produk baru
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images } = req.body;

    // Membuat productID unik secara otomatis
    const lastProduct = await Product.findOne({})
      .sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastProduct && lastProduct.productID) {
      const lastNumber = parseInt(lastProduct.productID.replace("PRD", ""));
      nextNumber = lastNumber + 1;
    }
    const productID = `PRD${String(nextNumber).padStart(3, "0")}`;

    const product = new Product({
      productID,
      name,
      description,
      price,
      category,
      images: images || [],
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mengupdate produk
export const updateProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID produk tidak valid" });
  }
  try {
    const { name, description, price, category, images } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, images },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Menghapus produk
export const deleteProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID produk tidak valid" });
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fungsi lainnya (getProductById, getProductByProductID) tetap sama...
export const getProductById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID produk tidak valid" });
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Produk tidak tersedia" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductByProductID = async (req, res) => {
  try {
    const product = await Product.findOne({ productID: req.params.productID });
    if (!product) return res.status(404).json({ error: "Produk tidak tersedia" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};