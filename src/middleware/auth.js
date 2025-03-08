const { verifyToken } = require('../controllers/authController');
const User = require('../models/userModel');
require('dotenv').config(); // Load environment variables from .env file

const auth = async (req, res, next) => {
    await verifyToken(req, res, next);
};

module.exports = auth;
