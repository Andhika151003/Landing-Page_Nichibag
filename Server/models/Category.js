import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category || mongoose.model('Category', categorySchema);