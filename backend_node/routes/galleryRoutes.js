const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect, restrictToAdmin: admin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/', galleryController.getGallery);
router.post('/', protect, admin, upload.single('image'), galleryController.createGalleryItem);
router.delete('/:id', protect, admin, galleryController.deleteGalleryItem);

module.exports = router;
