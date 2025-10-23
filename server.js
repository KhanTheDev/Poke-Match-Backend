// Main server file for PokéMatch backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

// Import routes
const userRoutes = require('./routes/users');
const scoreRoutes = require('./routes/scores');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully!');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({
        message: 'PokéMatch Backend API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            scores: '/api/scores'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        availableRoutes: [
            'GET /',
            'GET /health',
            'GET /api/users',
            'POST /api/users',
            'GET /api/scores',
            'POST /api/scores'
        ]
    });
});

// Start server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 PokéMatch Backend server running on port ${PORT}`);
    console.log(`📊 API available at: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
