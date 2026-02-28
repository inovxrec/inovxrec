const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/teamController');

// Routes
router.get('/', getTeamMembers);
router.post('/', upload.single('image'), createTeamMember);
router.put('/:id', upload.single('image'), updateTeamMember);
router.delete('/:id', deleteTeamMember);

module.exports = router;
