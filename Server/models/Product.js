import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    //agar rapi ku tambain product ID
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
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Export sebagai default
export default mongoose.model("Product", productSchema);
