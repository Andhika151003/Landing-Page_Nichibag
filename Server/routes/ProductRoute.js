import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controller/ProductController.js'; // Pastikan path ini benar
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', getAllProducts);       // GET /products
router.post('/', createProduct);      // POST /products
router.get('/:id', getProductById);   // GET /products/123
router.put('/:id', updateProduct);    // PUT /products/123
router.delete('/:id', deleteProduct); // DELETE /products/123

router.post('/testing/reset', async (req, res) => {
  try {
    await Product.deleteMany({});
    console.log('✅ Data produk berhasil direset untuk testing.');
    res.status(200).send({ message: 'Data produk berhasil direset.' });
  } catch (error) {
    console.error('❌ Gagal mereset data produk:', error);
    res.status(500).send({ message: 'Gagal mereset data produk.' });
  }
});

export default router;