const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');
const { protect, restrictToAdmin: admin } = require('../middleware/auth');

router.get('/', configController.getConfig);
router.post('/', protect, admin, configController.updateConfig);

module.exports = router;
