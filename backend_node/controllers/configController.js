const Config = require('../models/Config');

exports.getConfig = async (req, res) => {
    try {
        const configs = await Config.find();
        const configMap = {};
        configs.forEach(c => configMap[c.key] = c.value);
        res.json(configMap);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateConfig = async (req, res) => {
    try {
        const { key, value } = req.body;
        const config = await Config.findOneAndUpdate(
            { key },
            { value },
            { upsert: true, new: true }
        );
        res.json(config);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
