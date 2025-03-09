const express = require('express');
const router = express.Router();
const { getUserProfile, registerUser, loginUser } = require('../controllers/userController');
const { verifyUser, isAuthorised } = require('../middleware/authMiddleware');
const Roles = require('../models/roles');

// Route to get user profile
router.get('/profile', isAuthorised([Roles.User]), getUserProfile);

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

module.exports = router;
