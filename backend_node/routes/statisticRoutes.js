const express = require('express');
const router = express.Router();
const { getStatistics, createStatistic, updateStatistic, deleteStatistic } = require('../controllers/statisticController');

// Routes
router.get('/', getStatistics);
router.post('/', createStatistic);
router.put('/:id', updateStatistic);
router.delete('/:id', deleteStatistic);

module.exports = router;
