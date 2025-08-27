import express from "express";
import {
  createImage,
  getAllImages,
  getImageById,
  deleteImage
} from "../controller/ImageController.js";

const router = express.Router();

router.post("/", createImage);
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.delete("/:id", deleteImage);

export default router; // <-- pastikan baris ini ada!