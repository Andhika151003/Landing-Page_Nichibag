import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const existing = await User.findOne({ username: 'admin' });
        if(!existing) {
            console.log("admin sudah ada ngab", existing.username);
        } else {
            const user = new User({
                username: 'admin',
                password: 'admin123',
            });

            await user.save();
            console.log("admin berhasil dibuat yeayy");
        }
        mongoose.disconnect();
    } catch (error) {
        console.error("maaf anda gagal yah, membuat admin nya", error.message);
    }
};

createAdmin();
