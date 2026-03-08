const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

exports.getGallery = async (req, res) => {
    try {
        console.log(`[${new Date().toISOString()}] GET /api/gallery requested`);
        const gallery = await Gallery.find().sort({ order: 1 });
        console.log(`[${new Date().toISOString()}] Gallery success: Found ${gallery.length} items`);
        res.json(gallery);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Gallery error:`, err);
        res.status(500).json({ message: err.message, stack: err.stack });
    }
};

exports.createGalleryItem = async (req, res) => {
    try {
        const { title, category, order } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const item = new Gallery({
            title,
            category,
            order,
            image
        });

        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Delete image file if exists
        if (item.image) {
            const imagePath = path.join(__dirname, '..', item.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
