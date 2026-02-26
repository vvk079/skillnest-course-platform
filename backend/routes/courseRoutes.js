const express = require('express');
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
    .get(getCourses)
    .post(protect, admin, upload.single('image'), createCourse);

router.route('/:id')
    .get(getCourseById)
    .put(protect, admin, upload.single('image'), updateCourse)
    .delete(protect, admin, deleteCourse);

module.exports = router;
