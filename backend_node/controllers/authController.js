const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to create token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '7d'
    });
};

// Register (Disabled for now as we use hardcoded admin)
exports.register = async (req, res) => {
    res.status(501).json({ error: "Registration is temporarily disabled. Use hardcoded admin for now." });
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing credentials' });
        }

        // Check against hardcoded admin from .env
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const user = {
                _id: 'admin_id_hardcoded',
                username: 'admin',
                email: process.env.ADMIN_EMAIL,
                is_staff: true
            };

            const token = signToken(user._id);

            return res.json({
                user,
                tokens: {
                    access: token
                }
            });
        }

        // Optional fallback to DB users for regular members if needed, 
        // but user requested "don't use mongodb" for credentials
        return res.status(401).json({ error: 'Invalid admin credentials' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get current user profile
exports.getMe = async (req, res) => {
    // req.user is set by protect middleware
    res.json(req.user);
};
