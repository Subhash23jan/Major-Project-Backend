const express = require('express');
const router = express.Router();
const { getFoundItem, uploadFoundItem } = require('../utils/foundItemController');

// Route to get all found items
router.get('/:id',verifyUser, getFoundItem);

// Route to create a new found item
router.post('/upload-item', uploadFoundItem);

module.exports = router;
