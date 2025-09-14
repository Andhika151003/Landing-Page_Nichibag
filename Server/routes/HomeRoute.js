import express from 'express';
import { carouselController, featuredProductController, categoryController, heroButtonController } from '../controller/HomePageController.js';
import Carousel from '../models/Carousel.js';
import FeaturedProduct from '../models/FeaturedProduct.js';
import Category from '../models/Category.js';

const router = express.Router();

// Rute Tombol Hero
router.get('/hero-button', heroButtonController.get);
router.put('/hero-button', heroButtonController.update);

// Carousel Routes
router.get('/carousel', carouselController.getAll);
router.post('/carousel', carouselController.add);
router.delete('/carousel/:id', carouselController.delete);

// Featured Products Routes
router.get('/featured-products', featuredProductController.getAll);
router.post('/featured-products', featuredProductController.add);
router.delete('/featured-products/:id', featuredProductController.delete);

// Categories Routes
router.get('/categories', categoryController.getAll);
router.post('/categories', categoryController.add);
router.delete('/categories/:id', categoryController.delete);

// ROUTE KHUSUS UNTUK TESTING -- HAPUS SEMUA DATA KONTEN HOME
router.post('/testing/reset', async (req, res) => {
  try {
    // Hapus semua dokumen dari koleksi-koleksi ini
    await Carousel.deleteMany({});
    await FeaturedProduct.deleteMany({});
    await Category.deleteMany({});

    console.log('✅ Data halaman utama berhasil direset untuk testing.');
    res.status(200).send({ message: 'Data halaman utama berhasil direset.' });

  } catch (error) {
    console.error('❌ Gagal mereset data untuk testing:', error);
    res.status(500).send({ message: 'Gagal mereset data.' });
  }
});

export default router;