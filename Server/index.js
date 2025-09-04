import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoute from './routes/uploadRoute.js'; 
import UserRoute from './routes/LoginRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import HomeRoute from './routes/HomeRoute.js';
import AboutRoute from './routes/AboutRoute.js';
import ServiceRoute from './routes/ServiceRoute.js';
import seedAdmin from './utils/seedAdmin.js';

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Menyalakan logging query Mongoose untuk debugging
mongoose.set('debug', true);

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

// Notifikasi jika koneksi GAGAL
db.on("error", (error) => {
  console.error("==============================================");
  console.error("❌ KONEKSI DATABASE GAGAL:", error.message);
  console.error("==============================================");
});

// Notifikasi jika koneksi BERHASIL
db.once("open", async () => {
  console.log("==============================================");
  console.log("✅ Berhasil terhubung ke database MongoDB.");
  console.log("==============================================");
  await seedAdmin();
});

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('public'));
app.use('/api/upload', uploadRoute);

//Route Backend Intergrasi ke Frontend
app.use("/auth", UserRoute);
app.use("/products", ProductRoute);
app.use("/home", HomeRoute);
app.use("/api/about", AboutRoute);
app.use("/api/service", ServiceRoute); 

app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));