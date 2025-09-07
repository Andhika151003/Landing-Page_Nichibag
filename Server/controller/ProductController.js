import Product from "../models/Product.js";
import Log from "../models/LogActivity.js";

// // Mengambil semua produk
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ msg: "Gagal mengambil data produk", error: error.message });
//   }
// };

// // Mengambil satu produk berdasarkan ID
// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ msg: "Produk tidak ditemukan" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ msg: "Gagal mengambil data produk", error: error.message });
//   }
// };
// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // catat log
    await Log.create({
      user: req.body.user || "Admin",
      action: "create",
      type: "Product",
      status: "success",
    });

    res.status(201).json(product);
  } catch (err) {
    await Log.create({
      user: req.body.user || "Admin",
      action: "create",
      type: "Product",
      status: "failed",
    });
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    await Log.create({
      user: req.body.user || "Admin",
      action: "update",
      type: "Product",
      status: "success",
    });

    res.json(updated);
  } catch (err) {
    await Log.create({
      user: req.body.user || "Admin",
      action: "update",
      type: "Product",
      status: "failed",
    });

    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    await Log.create({
      user: req.body.user || "Admin",
      action: "delete",
      type: "Product",
      status: "success",
    });

    res.json({ message: "Product deleted" });
  } catch (err) {
    await Log.create({
      user: req.body.user || "Admin",
      action: "delete",
      type: "Product",
      status: "failed",
    });

    res.status(500).json({ message: err.message });
  }
};