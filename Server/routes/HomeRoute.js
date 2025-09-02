import express from 'express';
import { carouselController, featuredProductController, categoryController } from '../controller/HomePageController.js';

const router = express.Router();

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

export default router;