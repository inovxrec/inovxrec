const Statistic = require('../models/Statistic');

exports.getStatistics = async (req, res) => {
    try {
        const stats = await Statistic.find().sort({ order: 1 });
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createStatistic = async (req, res) => {
    try {
        const { label, value, suffix, order } = req.body;
        const stat = new Statistic({ label, value, suffix, order });
        const saved = await stat.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateStatistic = async (req, res) => {
    try {
        const updated = await Statistic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStatistic = async (req, res) => {
    try {
        await Statistic.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Statistic deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
