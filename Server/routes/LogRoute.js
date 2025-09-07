import express from "express";
import Log from "../models/LogActivity.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil log" });
  }
});

export default router;
