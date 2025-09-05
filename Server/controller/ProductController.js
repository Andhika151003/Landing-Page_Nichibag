import Product from '../models/Product.js'; // Sesuaikan path ke model Anda

// Mengambil semua produk
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Gagal mengambil data produk", error: error.message });
  }
};

// Mengambil satu produk berdasarkan ID-nya
export const getProductById = async (req, res) => {
  try {
    // Di frontend, Anda menggunakan productID, jadi kita cari berdasarkan itu
    const product = await Product.findOne({ productID: req.params.id }); 
    
    if (!product) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: "Gagal mengambil data produk", error: error.message });
  }
};