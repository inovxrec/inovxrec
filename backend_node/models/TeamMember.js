const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    socials: {
        github: String,
        linkedin: String,
        twitter: String
    },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
