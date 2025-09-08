import express from "express";
import Log from "../models/LogActivity.js";
import { saveLog } from "../utils/logger.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil log" });
  }
});

// Catat aksi reset ini sebagai log baru
router.delete("/reset", async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(200).json({ message: "Semua log aktivitas berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: "Gagal mereset log aktivitas." });
  }
});

export default router;
