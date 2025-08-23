import express from "express";
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Cek username sudah ada atau belum
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username sudah terdaftar" });
    }

    // Hash password sebelum simpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User berhasil didaftarkan" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // sesuaikan dengan monngoDB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // Cocokkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // Pesan berhasil
    res.json({ message: "Login berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

export default router;