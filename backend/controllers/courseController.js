const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        console.error('GET /api/courses Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(`GET /api/courses/${req.params.id} Error:`, error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Course ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
    const { title, description, instructor, duration, price, category } = req.body;
    const image = req.file ? req.file.path : '';

    try {
        const course = new Course({
            title,
            description,
            instructor,
            duration,
            price,
            category,
            image,
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        console.error('POST /api/courses Error:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
    const { title, description, instructor, duration, price, category } = req.body;
    const image = req.file ? req.file.path : undefined;

    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            course.title = title !== undefined ? title : course.title;
            course.description = description !== undefined ? description : course.description;
            course.instructor = instructor !== undefined ? instructor : course.instructor;
            course.duration = duration !== undefined ? duration : course.duration;
            course.price = price !== undefined ? price : course.price;
            course.category = category !== undefined ? category : course.category;
            if (image) course.image = image;

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(`PUT /api/courses/${req.params.id} Error:`, error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            await course.deleteOne();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Course ID format' });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};
