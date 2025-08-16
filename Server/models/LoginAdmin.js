import mongoose from "mongoose";

const User = new mongoose.Schema({
  //ini untuk isinya database format sesuain dengan ini nntinya
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
});

export default mongoose.model("User", User);
