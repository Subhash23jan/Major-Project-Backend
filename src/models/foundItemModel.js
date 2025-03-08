const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
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
            message: "Description should have more than 50 characters"
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
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function(value) {
                if (typeof value === 'string' && value === 'anonymous') {
                    return this.contactInfo && Object.keys(this.contactInfo).length > 0;
                }
                return mongoose.Types.ObjectId.isValid(value) || (typeof value === 'string' && value === 'anonymous');
            },
            message: 'UploadedBy must be a valid user ID or "anonymous" with contact information.'
        }
    },
    contactInfo: {
        type: Map,
        of: String,
        required: function() {
            return this.uploadedBy === 'anonymous';
        }
    }
});

const FoundItem = mongoose.model('FoundItem', foundItemSchema);

module.exports = FoundItem;