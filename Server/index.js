import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import ProductRoute from "./routes/ProductRoute.js";

const app = express();

// Koneksi ke MongoDB
mongoose.connect("mongodb://localhost:27017/nichibag_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", ProductRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
