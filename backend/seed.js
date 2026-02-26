const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const dotenv = require('dotenv');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Course.deleteMany({});

        // Create Admin User
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@skillnest.com',
            password: 'admin123',
            role: 'admin'
        });
        console.log('Admin user created');

        // Create Course
        await Course.create({
            title: 'Mastering React 2026',
            description: 'Advanced patterns and performance optimization in React.',
            instructor: 'Dr. Sarah Connor',
            duration: '15h 20m',
            price: 49.99,
            category: 'Web Development'
        });
        console.log('Sample course created');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seed();
