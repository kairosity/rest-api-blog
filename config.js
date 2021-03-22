const dotenv = require('dotenv');
dotenv.config();
const TWO_HOURS = 1000 * 60 * 60 * 2;
module.exports = {
    mongoURL: process.env.MONGO_URI,
    SESSION_LIFETIME: TWO_HOURS, 
    SESSION_SECRET: process.env.SESSION_SECRET
}