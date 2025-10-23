// Score model for game results
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: Number,
        required: true,
        min: 0
    },
    moves: {
        type: Number,
        required: true,
        min: 1
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

// Create indexes for leaderboard queries
scoreSchema.index({ time: 1 });
scoreSchema.index({ moves: 1 });
scoreSchema.index({ difficulty: 1 });
scoreSchema.index({ completedAt: -1 });

module.exports = mongoose.model('Score', scoreSchema);
