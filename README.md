# PokéMatch Backend

A Node.js/Express backend server with MongoDB for the PokéMatch memory game.

## Features

- **User Management**: Create, read, update, delete users
- **Score Tracking**: Save and retrieve game scores
- **Leaderboard**: Get top scores by difficulty
- **MongoDB Integration**: Full database support
- **RESTful API**: Clean API endpoints

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install MongoDB
**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `config.js` with your connection string

### 3. Run the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Scores
- `GET /api/scores` - Get all scores (leaderboard)
- `GET /api/scores?difficulty=easy&limit=10` - Get scores by difficulty
- `GET /api/scores/player/:playerName` - Get player's scores
- `GET /api/scores/top/:difficulty` - Get top scores by difficulty
- `POST /api/scores` - Save new score
- `DELETE /api/scores/:id` - Delete score

### Health Check
- `GET /health` - Check server and database status

## Example Usage

### Create a User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "ashketchum", "email": "ash@pokemon.com"}'
```

### Save a Score
```bash
curl -X POST http://localhost:5000/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName": "ashketchum", "time": 45, "moves": 12, "difficulty": "medium"}'
```

### Get Leaderboard
```bash
curl http://localhost:5000/api/scores?difficulty=medium&limit=5
```

## Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  bestTime: Number,
  bestMoves: Number,
  totalGames: Number,
  gamesWon: Number,
  createdAt: Date
}
```

### Score Model
```javascript
{
  playerName: String (required),
  time: Number (required),
  moves: Number (required),
  difficulty: String (easy/medium/hard),
  completedAt: Date
}
```

## Environment Variables

Create a `.env` file (optional):
```
MONGODB_URI=mongodb://localhost:27017/pokematch
PORT=5000
NODE_ENV=development
```

## Frontend Integration

Your frontend can connect to this backend by making HTTP requests to:
- Base URL: `http://localhost:5000`
- CORS is enabled for all origins
- All responses are in JSON format

## Troubleshooting

1. **MongoDB Connection Issues**
   - Make sure MongoDB is running
   - Check your connection string in `config.js`
   - Verify network access for Atlas

2. **Port Already in Use**
   - Change the PORT in `config.js`
   - Kill existing processes: `lsof -ti:5000 | xargs kill`

3. **CORS Issues**
   - CORS is enabled for all origins
   - If issues persist, check your frontend URL
