import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserRoute from './routes/LoginRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import KelolaRoute from './routes/kelolaRoute.js'; // Tambahkan import untuk route kelola

const app = express();


mongoose.connect('mongodb://localhost:27017/nichibag_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});  

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/users', UserRoute);
app.use('/api/products', ProductRoute);
app.use('/api/kelola', KelolaRoute); 

// Error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong',
    message: err.message 
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));