require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const adminExists = await User.findOne({ email: 'admin@inovx.club' });
        if (adminExists) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const admin = await User.create({
            username: 'admin',
            email: 'admin@inovx.club',
            password: 'admin123', // Will be hashed by model middleware
            is_staff: true
        });

        console.log("✅ Admin created successfully");
        console.log("Email: admin@inovx.club");
        console.log("Password: admin123");

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding admin:", err.message);
        process.exit(1);
    }
};

seedAdmin();
