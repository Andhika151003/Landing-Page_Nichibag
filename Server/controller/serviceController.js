import Service from '../models/Service.js';

// Mengambil data halaman service
export const getServiceData = async (req, res) => {
  try {
    let data = await ServicePage.findOne();
    if (!data) {
      data = new Service(); // Membuat dokumen baru jika belum ada
      await data.save();
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Memperbarui data halaman service
export const updateServiceData = async (req, res) => {
  try {
    const { cards, whatsappUrl, googleMapsUrl } = req.body;
    const updatedData = await ServicePage.findOneAndUpdate(
      {},
      { cards, whatsappUrl, googleMapsUrl },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};