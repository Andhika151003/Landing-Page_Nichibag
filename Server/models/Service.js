import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  imageUrl: { type: String, default: '' },
  title: { type: String, default: 'Judul Layanan' },
  description: { type: String, default: 'Deskripsi singkat layanan.' },
});

const servicePageSchema = new mongoose.Schema({
  cards: {
    type: [serviceSchema],
    default: () => [{}, {}, {}] 
  },
  whatsappUrl: { type: String, default: 'https://wa.me/6287788261298' },
  googleMapsUrl: { type: String, default: 'http://googleusercontent.com/maps.google.com/9' } // URL default yang valid
});

export default mongoose.model('Service', servicePageSchema);