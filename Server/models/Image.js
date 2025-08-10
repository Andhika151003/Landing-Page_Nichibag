import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Published", "Draft"],
    default: "Draft"
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String, // URL gambar
    default: null
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Image", imageSchema);
