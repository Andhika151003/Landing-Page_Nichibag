import express from "express";
import { createKelola, getKelola } from "../controller/KelolaController.js";

const router = express.Router();

// GET semua data kelola
router.get("/", getKelola);

// POST buat data baru (body harus ada field "type")
router.post("/", createKelola);

export default router;
