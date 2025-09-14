import express from 'express';
import { getAboutData, updateAboutData } from '../controller/AboutController.js';
import About from '../models/About.js'; 

const router = express.Router();

router.get('/', getAboutData);
router.put('/', updateAboutData);
router.post('/testing/reset', async (req, res) => {
  try {
    // Hapus dokumen yang ada
    await About.deleteMany({});

    // Buat dokumen baru dengan data default (kosong)
    await new About({ 
      imageUrl: '', 
      buttonUrl: '' 
    }).save();

    console.log('✅ Data halaman About berhasil direset untuk testing.');
    res.status(200).send({ message: 'Data halaman About berhasil direset.' });
  } catch (error) {
    console.error('❌ Gagal mereset data About:', error);
    res.status(500).send({ message: 'Gagal mereset data About.' });
  }
});

export default router;