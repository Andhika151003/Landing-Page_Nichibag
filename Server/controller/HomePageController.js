import { Carousel, FeaturedProduct, Category } from '../models/kelola.js';

// Logika disatukan di sini untuk kemudahan
const genericGetAll = (model) => async (req, res) => {
  try {
    const items = await model.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const genericAdd = (model) => async (req, res) => {
  try {
    const newItem = new model(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const genericDelete = (model) => async (req, res) => {
  try {
    const deletedItem = await model.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item tidak ditemukan' });
    res.status(200).json({ message: 'Item berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export semua fungsi CRUD untuk setiap model
export const carouselController = {
    getAll: genericGetAll(Carousel),
    add: genericAdd(Carousel),
    delete: genericDelete(Carousel),
};

export const featuredProductController = {
    getAll: genericGetAll(FeaturedProduct),
    add: genericAdd(FeaturedProduct),
    delete: genericDelete(FeaturedProduct),
};

export const categoryController = {
    getAll: genericGetAll(Category),
    add: genericAdd(Category),
    delete: genericDelete(Category),
};