const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    attempts: {
        type: Number,
        required: true
    },
    gameMode: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Score', scoreSchema);