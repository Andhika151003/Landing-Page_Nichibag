import mongoose from 'mongoose';

// Skema untuk tombol di Hero Section (tidak berubah)
const heroButtonSchema = new mongoose.Schema({
  buttonText: { type: String, default: "Order Now" },
  buttonLink: { type: String, default: "" }
});

// Model untuk Carousel (tidak berubah)
const carouselSchema = new mongoose.Schema({
  url: { type: String, required: true },
  link: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// ===== PERUBAHAN DI SINI: Tambahkan field harga dan diskon =====
const produkSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  url: { type: String, required: true },
  link: { type: String, default: '/katalog' },
  price: { type: Number, default: 0 },             // Harga normal
  discountPrice: { type: Number },                  // Harga setelah diskon (opsional)
  discountPercentage: { type: Number },             // Persentase diskon (opsional)
  createdAt: { type: Date, default: Date.now }
});

// Model untuk Kategori (tidak berubah)
const categorySchema = new mongoose.Schema({
  nama: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  link: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Carousel = mongoose.model('Carousel', carouselSchema);
export const FeaturedProduct = mongoose.model('FeaturedProduct', produkSchema);
export const Category = mongoose.model('Category', categorySchema);
export const HeroButton = mongoose.model('HeroButton', heroButtonSchema);