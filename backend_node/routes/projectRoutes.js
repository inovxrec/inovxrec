const express = require('express');
const router = express.Router();
const { upload } = require('../utils/cloudinary');
const { getProjects, createProject, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');

// Routes
router.get('/', getProjects);
router.post('/', upload.single('image'), createProject);
router.get('/:id', getProjectById);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
