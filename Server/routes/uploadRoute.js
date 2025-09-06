import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// PASTIKAN BAGIAN INI MENGGUNAKAN .array() BUKAN .single()
const upload = multer({ storage: storage });

router.post('/', upload.array('images', 10), (req, res) => { // <-- PASTIKAN INI BENAR
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ message: 'Pilih file untuk diupload.' });
  }

  // Bagian ini memetakan semua file yang diupload menjadi URL
  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  
  res.status(200).send({
    message: 'Gambar berhasil diupload',
    imageUrls: imageUrls
  });
});

export default router;