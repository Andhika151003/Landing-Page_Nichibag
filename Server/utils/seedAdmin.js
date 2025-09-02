import User from '../models/User.js';

//Login Username dan Password 
const seedAdmin = async () => {
  const adminData = {
    username: 'admin',
    password: 'admin123'
  };

//Kondisi ketika masuk kedalam database  
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