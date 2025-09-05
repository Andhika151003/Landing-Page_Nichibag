import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productID: {
      type: String,
      unique: true,
      required: false,
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
    // DIUBAH: dari imageUrls menjadi images agar konsisten
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);