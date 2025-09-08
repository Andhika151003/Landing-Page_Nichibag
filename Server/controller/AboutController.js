import About from '../models/About.js';
import { saveLog } from '../utils/logger.js';

// Get About Page Data
export const getAboutData = async (req, res) => {
  try {
    let aboutData = await About.findOne();
    if (!aboutData) {
      aboutData = new About();
      await aboutData.save();
    }
    res.json(aboutData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update About Page Data
export const updateAboutData = async (req, res) => {
  try {
    const { imageUrl, buttonUrl } = req.body;
    const updatedData = await About.findOneAndUpdate({}, { imageUrl, buttonUrl }, { new: true, upsert: true });
    await saveLog(req.user?.username || "Admin", "update", "AboutPage");
    res.json(updatedData);
  } catch (err) {
    await saveLog(req.user?.username || "Admin", "update", "AboutPage", "failed");
    res.status(400).json({ error: err.message });
  }
};