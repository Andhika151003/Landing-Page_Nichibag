import express from 'express';
import { getAllProducts, getProductById } from '../controller/ProductController.js';

const router = express.Router();

// Route untuk mendapatkan semua produk
// URL: GET http://localhost:5000/products
router.get('/', getAllProducts);

// Route untuk mendapatkan produk berdasarkan productID
// URL: GET http://localhost:5000/products/by-productid/:id
router.get('/by-productid/:id', getProductById);

export default router;