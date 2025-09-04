import express from 'express';
import { getServiceData, updateServiceData } from '../controller/serviceController.js';

const router = express.Router();

router.get('/', getServiceData);
router.put('/', updateServiceData);

export default router;