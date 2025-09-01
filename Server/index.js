// index.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserRoute from './routes/LoginRoute.js';

import seedAdmin from './utils/seedAdmin.js'; // ⬅️ Import

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB error:", error));
db.once("open", async () => {
  console.log("✅ Connected to database");
  await seedAdmin(); // 🌱 Buat admin jika belum ada
});

app.use(cors());
app.use(express.json());

app.use("/auth", UserRoute);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));