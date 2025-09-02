// Server/routes/uploadRoute.js
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Konfigurasi penyimpanan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk upload file
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Pilih file untuk diupload.' });
  }
  // Kirim kembali URL dari gambar yang berhasil diupload
  res.status(200).send({
    message: 'Gambar berhasil diupload',
    imageUrl: `/uploads/${req.file.filename}`
  });
});

export default router;