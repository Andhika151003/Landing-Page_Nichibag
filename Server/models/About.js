import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  aboutText: {
    type: String,
    default: ""
  },
  images: [
    {
      url: { type: String, required: true },
      filename: { type: String, default: "" }
    }
  ]
});

export default mongoose.model("About", AboutSchema);
