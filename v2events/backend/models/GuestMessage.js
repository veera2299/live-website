const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'NewEvent', // Must match the name of your Event model
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    displayDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GuestMessage', guestSchema);