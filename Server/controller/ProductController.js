import Product from '../models/Product.js';

// Mengambil semua produk
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Gagal mengambil data produk", error: error.message });
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
    res.status(500).json({ msg: "Gagal mengambil data produk", error: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: "Gagal mengambil data produk", error: error.message });
  }
};

// Membuat produk baru
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ msg: "Gagal membuat produk", error: error.message });
  }
};

// Memperbarui produk
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ msg: "Produk tidak ditemukan untuk diperbarui" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ msg: "Gagal memperbarui produk", error: error.message });
  }
};

// Menghapus produk
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: "Produk tidak ditemukan untuk dihapus" });
    }
    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Gagal menghapus produk", error: error.message });
  }
};