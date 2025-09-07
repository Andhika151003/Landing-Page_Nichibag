import express from "express";
import Product from "../models/Product.js"; // sesuaikan model
const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalCollections = await Product.countDocuments();
    const publishedCount = await Product.countDocuments({ status: "Published" });
    const draftCount = await Product.countDocuments({ status: "Draft" });
    const latestCollections = await Product.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: { totalCollections, publishedCount, draftCount },
      latestCollections,
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data dashboard" });
  }
});

export default router;
