// import { Carousel, FeaturedProduct, Category, HeroButton } from "../models/kelola.js";
import { Carousel, FeaturedProduct, Category, HeroButton } from "../models/kelola.js";

// GET semua data (misalnya untuk dashboard)
export const getKelola = async (req, res) => {
  try {
    const carousels = await Carousel.find();
    const products = await FeaturedProduct.find();
    const categories = await Category.find();
    const heroButtons = await HeroButton.find();

    res.json({ carousels, products, categories, heroButtons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST tambah data ke salah satu koleksi (contoh: produk)
export const createKelola = async (req, res) => {
  try {
    const { type, data } = req.body;

    let newItem;

    switch (type) {
      case "carousel":
        newItem = new Carousel(data);
        break;
      case "product":
        newItem = new FeaturedProduct(data);
        break;
      case "category":
        newItem = new Category(data);
        break;
      case "heroButton":
        newItem = new HeroButton(data);
        break;
      default:
        return res.status(400).json({ message: "Invalid type" });
    }

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
