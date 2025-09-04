import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  imageUrl: { type: String, default: '' },
  buttonUrl: { type: String, default: 'https://wa.me/6285334826169' }
});

export default mongoose.model('About', aboutSchema);