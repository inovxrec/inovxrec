const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    tech: [String],
    image: { type: String },
    github: { type: String },
    demo: { type: String },
    color: { type: String, default: "bg-primary" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
