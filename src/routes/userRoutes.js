const express = require('express');
const router = express.Router();
const { getUserProfile, registerUser, loginUser } = require('../controllers/userController');
const { verifyUser } = require('../middleware/authMiddleware');

// Route to get user profile
router.get('/profile', verifyUser, getUserProfile);

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

module.exports = router;
