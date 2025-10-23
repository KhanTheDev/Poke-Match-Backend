// Score routes for leaderboard
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// GET all scores (leaderboard)
router.get('/', async (req, res) => {
    try {
        const { difficulty, limit = 10 } = req.query;
        
        let query = {};
        if (difficulty) {
            query.difficulty = difficulty;
        }
        
        const scores = await Score.find(query)
            .sort({ time: 1, moves: 1 })
            .limit(parseInt(limit));
            
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET scores by player name
router.get('/player/:playerName', async (req, res) => {
    try {
        const scores = await Score.find({ 
            playerName: req.params.playerName 
        }).sort({ completedAt: -1 });
        
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST save new score
router.post('/', async (req, res) => {
    try {
        const { playerName, time, moves, difficulty } = req.body;
        
        const score = new Score({
            playerName,
            time,
            moves,
            difficulty
        });
        
        const savedScore = await score.save();
        res.status(201).json(savedScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET top scores by difficulty
router.get('/top/:difficulty', async (req, res) => {
    try {
        const { difficulty } = req.params;
        const { limit = 5 } = req.query;
        
        const scores = await Score.find({ difficulty })
            .sort({ time: 1, moves: 1 })
            .limit(parseInt(limit));
            
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE score
router.delete('/:id', async (req, res) => {
    try {
        const score = await Score.findByIdAndDelete(req.params.id);
        if (!score) {
            return res.status(404).json({ message: 'Score not found' });
        }
        res.json({ message: 'Score deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
