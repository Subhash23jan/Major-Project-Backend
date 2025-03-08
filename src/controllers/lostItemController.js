const { FoundItem, LostItem } = require('../models/utils');
const { matchedItems, generateDescriptionFromImage } = require('./utils');

// Function to get a lost item by ID
const getLostItem = async (req, res) => {
    const { id } = req.params;
    try {
        const lostItem = await LostItem.findById(id);
        if (!lostItem) {
            return res.status(404).json({ message: 'Lost item not found' });
        }
        if (lostItem.uploadedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized access to this lost item' });
        }
        res.json(lostItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to create a new lost item
const createLostItem = async (req, res) => {
    const lostItem = new LostItem(req.body);
    try {
        const newLostItem = await lostItem.save();
        res.status(201).json(newLostItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function to get matched items
const getMatchedItems = async (req, res) => {
    const { id } = req.params;
    try {
        const matchedItemsList = await matchedItems(id);
        res.json(matchedItemsList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to generate description from image
const generateDescription = async (req, res) => {
    const imageUrl = req.body.imageUrl;
    const description = await generateDescriptionFromImage(imageUrl);
    return res.json(description);
};

module.exports = {
    getLostItem,
    createLostItem,
    getMatchedItems,
    generateDescription
};
