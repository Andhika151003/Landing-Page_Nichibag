import { Carousel, FeaturedProduct, Category, HeroButton } from '../models/kelola.js';

const LIMITS = {
  Carousel: 4,
  FeaturedProduct: 6,
  Category: 6,
};

const genericGetAll = (model) => async (req, res) => {
  try {
    const items = await model.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const genericAdd = (model, modelName) => async (req, res) => {
  try {
    const count = await model.countDocuments();
    if (count >= LIMITS[modelName]) {
      return res.status(400).json({ message: `Batas maksimum untuk ${modelName} adalah ${LIMITS[modelName]}.` });
    }

    // ===== PERUBAHAN DI SINI: Cek duplikat nama =====
    if (req.body.nama && (modelName === 'FeaturedProduct' || modelName === 'Category')) {
      const existingItem = await model.findOne({ nama: req.body.nama });
      if (existingItem) {
        return res.status(400).json({ message: `Item dengan nama "${req.body.nama}" sudah ada.` });
      }
    }

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

// ... (sisa controller tetap sama) ...
const heroButtonController = {
  get: async (req, res) => {
    try {
      let button = await HeroButton.findOne();
      if (!button) {
        button = new HeroButton();
        await button.save();
      }
      res.status(200).json(button);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { buttonText, buttonLink } = req.body;
      const updatedButton = await HeroButton.findOneAndUpdate({}, { buttonText, buttonLink }, { new: true, upsert: true });
      res.status(200).json(updatedButton);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

export const carouselController = {
    getAll: genericGetAll(Carousel),
    add: genericAdd(Carousel, 'Carousel'),
    delete: genericDelete(Carousel),
};

export const featuredProductController = {
    getAll: genericGetAll(FeaturedProduct),
    add: genericAdd(FeaturedProduct, 'FeaturedProduct'),
    delete: genericDelete(FeaturedProduct),
};

export const categoryController = {
    getAll: genericGetAll(Category),
    add: genericAdd(Category, 'Category'),
    delete: genericDelete(Category),
};

export { heroButtonController };