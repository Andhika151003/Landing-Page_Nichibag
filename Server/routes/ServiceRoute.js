import express from 'express';
import { getServiceData, updateServiceData } from '../controller/serviceController.js';
import Service from '../models/Service.js';

const router = express.Router();

router.get('/', getServiceData);
router.put('/', updateServiceData);

router.post('/testing/reset', async (req, res) => {
  try {
    await Service.deleteMany({});

    await new Service({ 
      cards: [{}, {}, {}], 
    }).save();

    console.log('✅ Data layanan berhasil direset untuk testing.');
    res.status(200).send({ message: 'Data layanan berhasil direset.' });
  } catch (error) {
    console.error('❌ Gagal mereset data layanan:', error);
    res.status(500).send({ message: 'Gagal mereset data layanan.' });
  }
});

export default router;