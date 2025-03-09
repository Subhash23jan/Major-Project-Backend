const express = require('express');
const { getFoundItem, uploadFoundItem } = require('../controllers/foundItemController');
const { isAuthorised } = require('../middleware/authMiddleware');
const Roles = require('../models/roles');
const router = express.Router();


// Route to get found uploaded items
router.get('/:id',isAuthorised([Roles.User]), getFoundItem);

// Route to create a new found item
router.post('/upload-item', uploadFoundItem);

module.exports = router;
