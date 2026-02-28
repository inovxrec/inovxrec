require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const eventRoutes = require('./routes/eventRoutes');
const teamRoutes = require('./routes/teamRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const statisticRoutes = require('./routes/statisticRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to INOVX Backend API (Node.js/Express)" });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/statistics', statisticRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
