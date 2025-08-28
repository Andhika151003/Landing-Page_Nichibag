import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: { type: String },
   icon: { type: String }, 
   createdAt: { type: Date, default: Date.now } 
});

export default mongoose.model("Service", serviceSchema)