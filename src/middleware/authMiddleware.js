const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const LostItem = require('../models/lostItemModel');
const Roles = require('../models/roles');

// Middleware to verify user
const verifyUser = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

// Middleware to check if user is authorized based on roles
const isAuthorised = (roles) => {
    return asyncHandler(async (req, res, next) => {
        if (roles.includes(Roles.Anonymous)) return next();
        if (roles.includes(Roles.Admin) && req.user.role === Roles.Admin) return next();
        if (roles.includes(Roles.User) && req.user) return next();
        if (roles.includes(Roles.Owner)) {
            const lostItem = await LostItem.findById(req.params.itemId);
            if (lostItem.uploadedBy.toString() === req.user._id.toString()) return next();
        }
        res.status(403).json({ message: 'You are not authorized to access this resource' });
    });
};

module.exports = { verifyUser, isAuthorised };
