const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongoURL: process.env.MONGO_URI
}