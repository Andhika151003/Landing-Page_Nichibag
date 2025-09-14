import mongoose from 'mongoose';

// Skema ini mendefinisikan struktur data untuk setiap item carousel di database
const carouselSchema = new mongoose.Schema(
  {
    // Nama item, akan menjadi 'Item Baru' jika tidak diisi dari frontend
    nama: {
      type: String,
      required: true,
    },
    // URL atau path ke gambar yang disimpan di server
    url: {
      type: String,
      required: true,
    },
    // Link tujuan jika gambar carousel diklik (opsional)
    link: {
      type: String,
    },
  },
  {
    // Opsi ini akan otomatis menambahkan field `createdAt` dan `updatedAt`
    timestamps: true,
  }
);

// Membuat dan mengekspor model 'Carousel' agar bisa digunakan di file lain (seperti di controller dan route)
export default mongoose.models.Carousel || mongoose.model('Carousel', carouselSchema);