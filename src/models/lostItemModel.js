const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        validate: {
            validator: function(value) {
                return value.length > 50;
            },
            message: " Description should have more than 50 characters "
        }
    },
    otherInfo: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User needs to be registered or logged in to raise the complaint"],
        ref: 'User',
    },
});

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;