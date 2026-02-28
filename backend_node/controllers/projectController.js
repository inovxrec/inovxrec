const Project = require('../models/Project');

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { title, category, description, tech, github, demo, color } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        const newProject = new Project({
            title,
            category,
            description,
            tech: tech ? JSON.parse(tech) : [], // If sent as JSON string
            github,
            demo,
            color,
            image: imageUrl
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = req.file.path;
        if (updateData.tech) updateData.tech = JSON.parse(updateData.tech);

        const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
