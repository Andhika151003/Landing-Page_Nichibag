import mongoose from "mongoose";
import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product by MongoDB _id
export const getProductById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID produk tidak valid" });
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product tidak tersedia" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// menambahkan hal baru buat ga bingung di product ngurutin by id nya
export const getProductByProductID = async (req, res) => {
  try {
    const product = await Product.findOne({ productID: req.params.productID });
    if (!product) {
      return res.status(404).json({ error: "Product tidak tersedia" });
    }
    res.json(product);
  } catch (error) {
    
  }
}

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images } = req.body;

    // Cari productID terbesar
    const lastProduct = await Product.findOne({})
      .sort({ productID: -1 })
      .collation({ locale: "en_US", numericOrdering: true });

    let nextNumber = 1;
    if (lastProduct && lastProduct.productID) {
      // Ambil angka dari productID terakhir
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

// Update product
export const updateProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID produk tidak valid" });
  }
  try {
    const { name, description, price, category, images } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        images: images || undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "produk tidak tersedia" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID produk tidak valid" });
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "produk tidak tersedia" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};