const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Course = require('./models/Course');

const diagnose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log('Users found:', users.length);
        users.forEach(u => {
            console.log(`User: ${u.email}, Role: ${u.role}, Enrolled: ${u.enrolledCourses ? u.enrolledCourses.length : 'UNDEFINED'}`);
            if (u.enrolledCourses) {
                console.log('Enrollment IDs:', u.enrolledCourses);
            }
        });

        const courses = await Course.find({});
        console.log('Courses found:', courses.length);
        courses.forEach(c => {
            console.log(`Course: ${c.title}, ID: ${c._id}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Diagnosis failed:', err);
        process.exit(1);
    }
};

diagnose();
