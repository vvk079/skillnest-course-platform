const express = require('express');
const { enrollCourse, getUserDashboard, getEnrolledStudents } = require('../controllers/enrollController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:courseId', protect, enrollCourse);
router.get('/dashboard', protect, getUserDashboard);
router.get('/students', protect, admin, getEnrolledStudents);

module.exports = router;
