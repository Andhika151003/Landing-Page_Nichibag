import Service from '../models/Service.js';
import { saveLog } from '../utils/logger.js';


export const getServiceData = async (req, res) => {
  try {
    let data = await Service.findOne();
    if (!data) {
      data = new Service(); 
      await data.save();
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateServiceData = async (req, res) => {
  try {
    const { cards, whatsappUrl, googleMapsUrl } = req.body;
    const updatedData = await Service.findOneAndUpdate(
      {},
      { cards, whatsappUrl, googleMapsUrl },
      { new: true, upsert: true, runValidators: true }
    );
    await saveLog(req.user?.username || "Admin", "update", "ServicePage");
    res.json(updatedData);
  } catch (err) {
    await saveLog(req.user?.username || "Admin", "update", "ServicePage", "failed");
    res.status(400).json({ message: err.message });
  }
};