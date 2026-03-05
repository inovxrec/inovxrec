const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    icon: { type: String, default: "Calendar" },
    color: { type: String, default: "bg-primary" },
    isLive: { type: Boolean, default: false },
    liveLink: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
