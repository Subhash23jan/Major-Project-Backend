const jwt = require('jsonwebtoken');
const { User } = require('../models/utils');
require('dotenv').config(); // Load environment variables from .env file

const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token')?.replace('Bearer ', '');
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            req.user = null;
        } else {
            req.user = user;
        }
    } catch (err) {
        req.user = null;
    }

    next();
};

const verifyUser = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ message: 'Please login before continue' });
    }
    next();
};

module.exports = {
    verifyToken,
    verifyUser
};
