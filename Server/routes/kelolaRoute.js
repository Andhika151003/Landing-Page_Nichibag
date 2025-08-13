// routes/kelolaRoute.js
import express from 'express';
import { 
  getCarouselImages, 
  addCarouselImage, 
  deleteCarouselImage,
  getProdukTerbaik,
  addProduk,
  deleteProduk,
  getKategori,
  addKategori,
  deleteKategori
} from '../controller/koleksiController.js';

const router = express.Router();

// Carousel routes
router.get('/carousel', getCarouselImages);
router.post('/carousel', addCarouselImage);
router.delete('/carousel/:id', deleteCarouselImage);

// Produk routes
router.get('/produk', getProdukTerbaik);
router.post('/produk', addProduk);
router.delete('/produk/:id', deleteProduk);

// Kategori routes
router.get('/kategori', getKategori);
router.post('/kategori', addKategori);
router.delete('/kategori/:id', deleteKategori);

export default router;