const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const token = jwt.sign({ id: '69a024767703f72f89fed0c2' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
});

console.log(token);
process.exit(0);
