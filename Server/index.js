import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import login from "./routes/LoginRoute.js";
import UserRoute from "./routes/LoginRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import KelolaRoute from "./routes/kelolaRoute.js"; 
import ImageRoute from "./routes/Image.js"; 

const app = express();
const PORT = process.env.PORT || 5000;

// Koneksi ke MongoDB
mongoose.connect("mongodb://localhost:27017/nichibag_db");

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log(" Connected to database"));

// Middleware harus sebelum route
app.use(cors());
app.use(express.json());

// Gunakan route login
app.use(login);
app.use("/auth",UserRoute);
app.use("/products", ProductRoute);
app.use("/kelola", KelolaRoute);
app.use("/images", ImageRoute);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));