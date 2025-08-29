// routes/LoginRoute.js
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

// 🔐 Hardcoded admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Kita hash password "admin123" sekali saat server start
let ADMIN_PASSWORD_HASH;

// Hash password saat server start
(async () => {
  ADMIN_PASSWORD_HASH = await bcrypt.hash(ADMIN_PASSWORD, 10);
  console.log("✅ Admin password hashed");
})();

// 🔐 Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi" });
  }

  // Cek username
  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ message: "Username atau password salah" });
  }

  // Cek password (dibandingkan dengan hash)
  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ message: "Username atau password salah" });
  }

  // 🔐 Login berhasil
  res.status(200).json({
    message: "Login berhasil",
    user: { username: ADMIN_USERNAME }
  });
});

export default router;