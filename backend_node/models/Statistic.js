const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: "+" },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Statistic', statisticSchema);
