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
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// ===== PERUBAHAN DI SINI: Ganti upload.single menjadi upload.array =====
// 'images' adalah nama field, dan 10 adalah batas maksimal file per request
const upload = multer({ storage: storage });

router.post('/', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.error('❌ Gagal: Tidak ada file yang dipilih untuk diunggah.');
    return res.status(400).send({ message: 'Pilih file untuk diupload.' });
  }

  // ===== PERUBAHAN DI SINI: Mapping hasil unggahan menjadi array of URLs =====
  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  
  console.log(`✅ Berhasil: ${req.files.length} gambar telah diunggah.`);
  
  res.status(200).send({
    message: 'Gambar berhasil diupload',
    imageUrls: imageUrls // Kirim kembali array of URLs
  });
});

export default router;