import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  imageUrls: { type: [String], required: true },
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
    orderLink: {
        type: String,
        trim: true,
        default: "", 
    },
    // --- PENAMBAHAN FIELD YANG HILANG DIMULAI DI SINI ---
    material: { 
      type: String, 
      default: '' 
    },
    weight: { 
      type: Number, 
      default: 0 
    },
    dimensions: {
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
    // --- PENAMBAHAN FIELD SELESAI ---
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