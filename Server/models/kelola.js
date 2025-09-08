import mongoose from 'mongoose';

// Skema untuk tombol di Hero Section
const heroButtonSchema = new mongoose.Schema({
  buttonText: { type: String, default: "Order Now" },
  buttonLink: { type: String, default: "" }
});

// Model untuk Carousel
const carouselSchema = new mongoose.Schema({
  url: { type: String, required: true },
  link: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Model untuk Produk
const produkSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  url: { type: String, required: true },
  link: { type: String, default: '/katalog' },
  price: { type: Number },               // Harga normal
  discountPrice: { type: Number },       // Harga setelah diskon (opsional)
  discountPercentage: { type: Number },  // Persentase diskon (opsional)
  createdAt: { type: Date, default: Date.now }
});

// Model untuk Kategori
const categorySchema = new mongoose.Schema({
  nama: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  link: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Export sebagai named export
export const Carousel = mongoose.model('Carousel', carouselSchema);
export const FeaturedProduct = mongoose.model('FeaturedProduct', produkSchema);
export const Category = mongoose.model('Category', categorySchema);
export const HeroButton = mongoose.model('HeroButton', heroButtonSchema);

// di sini tidak banyak perubahan