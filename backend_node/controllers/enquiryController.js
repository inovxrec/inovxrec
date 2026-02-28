const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const enquiry = new Enquiry({ name, email, subject, message });
        const saved = await enquiry.save();
        res.status(201).json({ message: "Message sent! We'll get back to you shortly.", enquiry: saved });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEnquiryStatus = async (req, res) => {
    try {
        const updated = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEnquiry = async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Enquiry deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
