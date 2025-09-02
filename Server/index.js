import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoute from './routes/uploadRoute.js'; 
import UserRoute from './routes/LoginRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import HomeRoute from './routes/homeRoute.js';
import ServiceRoute from './routes/ServiceRoute.js';
import seedAdmin from './utils/seedAdmin.js';

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB error:", error));
db.once("open", async () => {
  console.log("✅ Connected to database");
  await seedAdmin();
});

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/upload', uploadRoute);

//Route Backend Intergrasi ke Frontend
app.use("/auth", UserRoute);
app.use("/products", ProductRoute);
app.use("/home", HomeRoute);
app.use("/services", ServiceRoute);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));