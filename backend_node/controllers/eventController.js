const Event = require('../models/Event');

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { date, title, description, location, category, color, icon } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        const newEvent = new Event({
            date, title, description, location, category, color, icon, image: imageUrl
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = req.file.path;

        const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
