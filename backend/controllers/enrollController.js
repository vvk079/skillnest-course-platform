const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enroll/:courseId
// @access  Private
const enrollCourse = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const user = await User.findById(req.user._id);
        const courseId = req.params.courseId;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (!user.enrolledCourses) {
            user.enrolledCourses = [];
        }

        const isAlreadyEnrolled = user.enrolledCourses.some(
            (id) => id.toString() === courseId
        );

        if (isAlreadyEnrolled) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).json({ message: 'Enrolled successfully' });

    } catch (error) {
        console.error('Enrollment Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};

// @desc    Get user dashboard data
// @route   GET /api/user/dashboard
// @access  Private
const getUserDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('enrolledCourses');
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                enrolledCourses: user.enrolledCourses,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};

// @desc    Get all enrolled students (Admin only)
// @route   GET /api/enroll/students
// @access  Private/Admin
const getEnrolledStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'user' })
            .populate('enrolledCourses', 'title category price')
            .select('-password');

        res.json(students);
    } catch (error) {
        console.error('Fetch Students Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};

module.exports = { enrollCourse, getUserDashboard, getEnrolledStudents };
