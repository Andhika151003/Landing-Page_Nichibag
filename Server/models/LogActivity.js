import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    action: { type: String, enum: ["create", "update", "delete"], required: true },
    type: { type: String, required: true }, // contoh: "Product"
    status: { type: String, enum: ["success", "failed"], default: "success" },
  },
  { timestamps: true }
);

export default mongoose.model("Log", LogSchema);
