import mongoose from 'mongoose';

// Model untuk Carousel
const carouselSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Model untuk Produk
const produkSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const categorySchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Carousel = mongoose.model('Carousel', carouselSchema);
export const FeaturedProduct = mongoose.model('FeaturedProduct', produkSchema);
export const Category = mongoose.model('Category', categorySchema);