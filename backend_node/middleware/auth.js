const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: 'You are not logged in! Please log in to get access.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

        // Check if it's the hardcoded admin
        if (decoded.id === 'admin_id_hardcoded') {
            req.user = {
                id: 'admin_id_hardcoded',
                username: 'admin',
                email: process.env.ADMIN_EMAIL,
                is_staff: true
            };
            return next();
        }

        // Check if user still exists in DB (for regular users)
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ error: 'The user belonging to this token no longer exists.' });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

exports.restrictToAdmin = (req, res, next) => {
    if (!req.user.is_staff) {
        return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }
    next();
};
