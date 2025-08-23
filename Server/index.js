import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/LoginRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import KelolaRoute from "./routes/kelolaRoute.js"; // Tambahkan import untuk route kelola

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

app.use(UserRoute);
app.use(ProductRoute);
app.use(KelolaRoute);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));