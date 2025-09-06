import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controller/ProductController.js'; // Pastikan path ini benar

const router = express.Router();

router.get('/', getAllProducts);       // GET /products
router.post('/', createProduct);      // POST /products
router.get('/:id', getProductById); 
router.get('/slug/:slug', getProductBySlug);  // GET /products/123
router.put('/:id', updateProduct);    // PUT /products/123
router.delete('/:id', deleteProduct); // DELETE /products/123

export default router;