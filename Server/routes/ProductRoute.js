import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductByProductID,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controller/ProductController.js'; 

const router = express.Router();

// Mendapatkan semua produk & Membuat produk baru
router.route('/')
  .get(getAllProducts)
  .post(createProduct);

// Rute spesifik harus didefinisikan sebelum rute dinamis seperti /:id
router.get('/by-productid/:productID', getProductByProductID);

// Mendapatkan, mengubah, dan menghapus produk berdasarkan ID unik (_id)
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
