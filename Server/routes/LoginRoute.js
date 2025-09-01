import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// 🔐 Login Route
router.post('/login', async (req, res) => {
  // 👇 TAMBAHKAN BARIS INI UNTUK DEBUGGING
  console.log("Request Body yang diterima server:", req.body);

  const { username, password } = req.body;

  // 1. Validasi input
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi" });
  }

  try {
    // 2. Cek ke database: apakah user 'admin' ada?
    const user = await User.findOne({ username: 'admin' });

    // 3. Jika tidak ada user 'admin' di database → ditolak
    if (!user) {
      return res.status(401).json({ message: "Login gagal: admin belum terdaftar di sistem" });
    }

    // 4. Cek apakah yang login benar-benar 'admin'
    if (username !== 'admin') {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // 5. Cek password (dibandingkan dengan hash di database)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // 6. ✅ Login berhasil
    res.status(200).json({
      message: "Login berhasil",
      user: { id: user._id, username: user.username }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

export default router;