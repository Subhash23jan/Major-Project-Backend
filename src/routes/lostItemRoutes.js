const express = require('express');
const router = express.Router();
const { getLostItem, createLostItem, getMatchedItems } = require('../controllers/lostItemController');
const { verifyUser } = require('../controllers/authController');

// Route to create a new lost item
router.post('/file-complaint',verifyUser,createLostItem);

// Route to get matched items
router.get('/matched/:id',verifyUser, getMatchedItems);

// Route to get a lost item by ID
router.get('/:id',verifyUser, getLostItem);

// Route to generate description from image
router.get('/generate-description',verifyUser, generateDescription);

module.exports = router;
