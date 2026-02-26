const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const token = jwt.sign({ id: '69a024767703f72f89fed0c2' }, process.env.JWT_SECRET);
const courseId = '69a026e07703f72f89fed0c9';

const testEnroll = async () => {
    try {
        console.log(`Enrolling in course: ${courseId}`);
        const response = await fetch(`http://localhost:5000/api/enroll/${courseId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (err) {
        console.error('Test failed:', err);
    }
};

testEnroll();
