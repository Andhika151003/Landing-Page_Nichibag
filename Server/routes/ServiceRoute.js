import express from 'express';
import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from '../controllers/ServiceController.js'; 

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.get("/", createService);
router.get("/:id", updateService);
router.get("/:id", deleteService);


export default router;