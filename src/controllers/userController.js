const { User } = require('../models/utils');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Function to get user profile
const getUserProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json(req.user);
};

// Function to register a new user
const registerUser = async (req, res) => {
    if (req.user) {
        return res.status(400).json({ message: 'User already logged in' });
    }

    const user = new User(req.body);
    try {
        const newUser = await user.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(201).json({ user: newUser, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function to log in a user
const loginUser = async (req, res) => {
    if (req.user) {
        return res.status(400).json({ message: 'User already logged in' });
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUserProfile,
    registerUser,
    loginUser
};
