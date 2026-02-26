const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
    },
    duration: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
        default: 'General',
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
