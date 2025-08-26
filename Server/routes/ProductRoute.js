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

router.get('/', getAllProducts);
// Route khusus harus di atas route :id
router.get('/by-productid/:productID', getProductByProductID);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;