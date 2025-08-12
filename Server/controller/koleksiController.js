// controller/koleksiController.js
import { Carousel, Produk, Kategori } from '../models/kelola.js';

// Carousel
export const getCarouselImages = async (req, res) => {
  try {
    const images = await Carousel.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCarouselImage = async (req, res) => {
  const { url } = req.body;
  
  try {
    const newImage = new Carousel({ url });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCarouselImage = async (req, res) => {
  try {
    const image = await Carousel.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await image.remove();
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Produk
export const getProdukTerbaik = async (req, res) => {
  try {
    const produk = await Produk.find().sort({ createdAt: -1 });
    res.json(produk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addProduk = async (req, res) => {
  const { nama, url } = req.body;
  
  try {
    const newProduk = new Produk({ nama, url });
    await newProduk.save();
    res.status(201).json(newProduk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduk = async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);
    if (!produk) return res.status(404).json({ message: 'Product not found' });

    await produk.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kategori
export const getKategori = async (req, res) => {
  try {
    const kategori = await Kategori.find().sort({ createdAt: -1 });
    res.json(kategori);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addKategori = async (req, res) => {
  const { nama } = req.body;
  
  try {
    const newKategori = new Kategori({ nama });
    await newKategori.save();
    res.status(201).json(newKategori);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findById(req.params.id);
    if (!kategori) return res.status(404).json({ message: 'kategori tidak tersidia' });

    await kategori.remove();
    res.json({ message: 'kategori berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};