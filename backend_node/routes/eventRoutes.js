const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

// Routes
router.get('/', getEvents);
router.post('/', upload.single('image'), createEvent);
router.put('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
