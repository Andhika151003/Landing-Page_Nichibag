import Image from "../models/Image.js";

// Create Image
export const createImage = async (req, res) => {
    try {
        const { name, type, status, image, isFeatured } = req.body;
        const newImage = new Image({
            name,
            type,
            status,      // opsional, default "Draft"
            image,       // URL gambar
            isFeatured   // opsional, default false
        });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all images
export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get image by ID
export const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ error: "Image tidak ditemukan" });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete image
export const deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).json({ error: "Image tidak ditemukan" });
        }
        res.json({ message: "Image berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};