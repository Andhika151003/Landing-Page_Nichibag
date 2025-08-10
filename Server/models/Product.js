import mongoose from "mongoose";

const Product = new mongoose.Schema({
  carouselImages: [
    {
      url: { type: String, required: true },
    },
  ],
  produkTerbaik: [
    {
      nama: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  kategori: [
    {
      nama: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Koleksi",Product);
