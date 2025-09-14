import mongoose from 'mongoose';

const featuredProductSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    discountPercentage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FeaturedProduct || mongoose.model('FeaturedProduct', featuredProductSchema);