const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lostItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LostItem',
        default: []
    }],
    foundItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoundItem',
        default: []
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
