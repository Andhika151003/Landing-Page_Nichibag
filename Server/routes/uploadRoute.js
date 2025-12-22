// Server/routes/uploadRoute.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi Storage Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        // Nama file unik: timestamp-random.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter File (Hanya Gambar)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit 5MB per file
});

// ROUTE UTAMA
// .array('images') -> KUNCI UTAMA AGAR COCOK DENGAN FRONTEND
router.post('/', upload.array('images'), (req, res) => {
    try {
        // Cek apakah ada file
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Tidak ada file yang diupload.' });
        }

        // Buat URL untuk setiap file yang berhasil diupload
        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        
        res.status(200).json({ 
            message: 'Upload berhasil', 
            imageUrls: imageUrls 
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;