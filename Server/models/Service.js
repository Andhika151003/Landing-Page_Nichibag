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
  // PERBAIKAN: Menggunakan URL default Google Maps yang valid
  googleMapsUrl: { 
    type: String, 
    default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.558393432321!2d112.7548393757825!3d-7.29082427163539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf839055555%3A0x1932338575086010!2sUniversitas%20Airlangga!5e0!3m2!1sen!2sid!4v1691583000000!5m2!1sen!2sid' 
  }
});

export default mongoose.model('Service', servicePageSchema);