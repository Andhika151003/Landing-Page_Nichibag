import express from 'express';
import { getAboutData, updateAboutData } from '../controller/AboutController.js';

const router = express.Router();

router.get('/', getAboutData);
router.put('/', updateAboutData);

export default router;