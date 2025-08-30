// utils/seedAdmin.js
import User from '../models/User.js';

const seedAdmin = async () => {
  const adminData = {
    username: 'admin',
    password: 'admin123' // Akan di-hash oleh pre-save
  };

  try {
    const existing = await User.findOne({ username: 'admin' });
    if (!existing) {
      await User.create(adminData);
      console.log('✅ Admin user (admin/admin123) berhasil dibuat di database');
    } else {
      console.log('🟢 Admin user sudah ada di database');
    }
  } catch (err) {
    console.error('❌ Gagal membuat admin:', err.message);
  }
};

export default seedAdmin;