import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import login from "./routes/LoginRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/nichibag_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(" Connected to database"));

app.use(cors());
app.use(express.json());

// Gunakan route login
app.use(login);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
