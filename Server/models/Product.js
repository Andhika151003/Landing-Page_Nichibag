import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  imageUrl: { type: String, required: true } // Setiap warna punya 1 gambar
});


const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    colors: [colorSchema],
    // 👇 FIELD BARU: Untuk link tombol "Pesan Sekarang"
    orderLink: {
        type: String,
        trim: true,
        default: "", // Default kosong
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('discountPrice').get(function() {
  if (this.price && this.discountPercentage > 0) {
    return this.price - (this.price * this.discountPercentage / 100);
  }
  return null;
});

export default mongoose.model("Product", productSchema);