const express = require('express');
const router = express.Router();
const Roles = require('../models/roles');
const { getLostItem, createLostItem, getMatchedItems } = require('../controllers/lostItemController');
const { isAuthorised } = require('../middleware/authMiddleware');
const {updateLostItemStatus} = require('../controllers/lostItemController');
const { generateDescriptionFromImage } = require('../controllers/apiController');

// Route to create a new lost item
router.post('/file-complaint',isAuthorised([Roles.User]),createLostItem);

// Route to get matched items
router.get('/matched/:itemId',isAuthorised([Roles.Owner]), getMatchedItems);

// Route to get a lost item by ID
router.get('/:itemId',isAuthorised([Roles.Owner]), getLostItem);

// Route to generate description from image
router.get('/generate-description',isAuthorised([Roles.User]), generateDescriptionFromImage);

// Update status of a specific lost item by ID
router.put('/update-status/:itemId',isAuthorised([Roles.Owner]), updateLostItemStatus);

module.exports = router;
