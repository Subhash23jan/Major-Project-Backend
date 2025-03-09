const { FoundItem } = require('../models/utils');
const { generateDescriptionFromImage } = require('./utils');

// Function to get a found item by ID
const getFoundItem = async (req, res) => {
    const { id } = req.params;
    try {
        const foundItem = await FoundItem.findById(id);
        if (!foundItem) {
            return res.status(404).json({ message: 'Found item not found' });
        }
        if (foundItem.uploadedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized access to this found item' });
        }
        res.json(foundItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to upload a new found item
const uploadFoundItem = async (req, res) => {
    const foundItem = new FoundItem(req.body);
    try {
        const newFoundItem = await foundItem.save();
        res.status(201).json(newFoundItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Function to generate description from image
const generateDescription = async (req, res) => {
    const imageUrl = req.body.imageUrl;
    const description = await generateDescriptionFromImage(imageUrl);
    return res.json(description);
};

module.exports = {
    getFoundItem,
    uploadFoundItem,
    generateDescription
};
