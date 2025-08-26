import Image from "../models/Image.js";

//buat create IMage 
export const createImage = async (req, res) => {
    try {
        const { url, description, product } = req.body;
        const image = new Image({ url, description, product});
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get all image
export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find().populate("product");
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// ini buat gett image by ID 
export const getImageByIDd = async (req, res) => {
    try {
        const image = await image.findById(req.params.id).populate("product");
        if (!image) {
            return res.status(404).json({ error: "Image tidak di temukan" });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//ini buat delete image
export const deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).json({ error: "Image tidak di temukan" });
        }
        res.json({ message: "Image Berhasil di hapus" });
    } catch (error) {
        res.status(500).json({ error: error.message });       
    }
}