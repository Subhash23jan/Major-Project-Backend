const { FoundItem } = require('../models/utils');
const axios = require('axios');

// Function to get matched items
const matchedItems = async (id) => {
    try {
        const foundItem = await FoundItem.findById(id);
        const allItems = await FoundItem.find();
        if (!foundItem) {
            throw new Error('Found item not found');
        }

        const matchedItems = allItems.filter(item => {
            return (
                item.name.includes(foundItem.name) ||
                item.description.includes(foundItem.description) ||
                item.tags.some(tag => foundItem.tags.includes(tag))
            );
        });

        return matchedItems;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Function to generate description from image
const generateDescriptionFromImage = async (image) => {
    try {
        const response = await axios.post('https://external-api.com/generate-description', {
            image: image
        });
        return response.data.description;
    } catch (err) {
        throw new Error('Failed to generate description from image');
    }
};

const uploadImage = async (image) => {
    return "https://www.boat-lifestyle.com/cdn/shop/files/ACCG6DS7WDJHGWSH_0.png";
    try {
        const response = await axios.post('https://external-api.com/upload-image', {
            image: image
        });
        return response.data.imageUrl;
    } catch (err) {
        throw new Error('Failed to upload image');
    }
};

module.exports = {
    matchedItems,
    generateDescriptionFromImage,
    uploadImage
};
