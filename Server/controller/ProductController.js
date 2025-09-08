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

// CREATE (Diperbaiki untuk keamanan)
export const createProduct = async (req, res) => {
  const user = req.body?.user || "Admin"; // 🔹 Akses req.body dengan aman
  try {
    const product = await Product.create(req.body);
    await Log.create({
      user,
      action: "create",
      type: "Product",
      status: "success",
    });
    res.status(201).json(product);
  } catch (err) {
    await Log.create({
      user,
      action: "create",
      type: "Product",
      status: "failed",
    });
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (Diperbaiki untuk keamanan)
export const updateProduct = async (req, res) => {
  const user = req.body?.user || "Admin"; // 🔹 Akses req.body dengan aman
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // 🔹 Cek jika produk ada
    if (!updated) {
      await Log.create({
        user,
        action: "update",
        type: "Product",
        status: "failed",
      });
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan untuk diupdate." });
    }

    await Log.create({
      user,
      action: "update",
      type: "Product",
      status: "success",
    });
    res.json(updated);
  } catch (err) {
    await Log.create({
      user,
      action: "update",
      type: "Product",
      status: "failed",
    });
    res.status(500).json({ message: err.message });
  }
};

// DELETE (Diperbaiki untuk keamanan)
export const deleteProduct = async (req, res) => {
  const user = "Admin"; // 🔹 Langsung gunakan "Admin" karena DELETE tidak punya body
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    // 🔹 Cek jika produk ada
    if (!deleted) {
      await Log.create({
        user,
        action: "delete",
        type: "Product",
        status: "failed",
      });
      return res
        .status(404)
        .json({ message: "Produk tidak ditemukan untuk dihapus." });
    }

    await Log.create({
      user,
      action: "delete",
      type: "Product",
      status: "success",
    });
    res.json({ message: "Product deleted" });
  } catch (err) {
    await Log.create({
      user,
      action: "delete",
      type: "Product",
      status: "failed",
    });
    res.status(500).json({ message: err.message });
  }
};
