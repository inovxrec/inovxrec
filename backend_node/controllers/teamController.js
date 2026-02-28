const TeamMember = require('../models/TeamMember');

exports.getTeamMembers = async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTeamMember = async (req, res) => {
    try {
        const { name, role, bio, socials, order } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        const member = new TeamMember({
            name, role, bio, order,
            socials: socials ? JSON.parse(socials) : {},
            image: imageUrl
        });

        const saved = await member.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTeamMember = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = req.file.path;
        if (updateData.socials) updateData.socials = JSON.parse(updateData.socials);

        const updated = await TeamMember.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTeamMember = async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Member deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
