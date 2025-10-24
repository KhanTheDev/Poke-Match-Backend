# 🧩 PokéMatch Backend – Full README

A **Node.js + Express + MongoDB** backend for the PokéMatch Memory Game.  
Handles **Users** and **Scores** with clean **CRUD APIs**, ready for connection to the React frontend.

---

## 🚀 Features
- RESTful API (`/api/users`, `/api/scores`)
- MongoDB persistence with Mongoose
- Input validation & error handling
- CORS support
- Scalable structure (ready for auth or leaderboard logic)
- Built for connection with React PokéMatch frontend

---

## 🗂️ Project Structure
pokematch-backend/
│
├── server.js # Entry point
├── package.json
├── .env # Environment variables
│
├── config/
│ ├── db.js # MongoDB connection
│ └── env.js # Loads and manages environment vars
│
├── models/
│ ├── User.js # User model
│ └── Score.js # Score model
│
└── routes/
├── users.routes.js # User CRUD routes
└── scores.routes.js # Score CRUD routes

yaml
Copy code

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

### Install Dependencies
```bash
npm install
Environment Variables
Create a .env file in the project root:

ini
Copy code
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pokematch
CORS_ORIGIN=http://localhost:5173
Run Server
bash
Copy code
npm run dev
Server will start on http://localhost:5000

🧱 Models
🧍‍♂️ User Model (models/User.js)
js
Copy code
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  bestTime: { type: Number, default: null },
  bestMoves: { type: Number, default: null },
  totalGames: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
🏆 Score Model (models/Score.js)
js
Copy code
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: { type: String, required: true, trim: true },
  time: { type: Number, required: true },
  moves: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);
🔗 API Routes
Base URL: http://localhost:5000/api

👤 Users
Method	Endpoint	Description
POST	/users	Create a new user
GET	/users	Get all users
GET	/users/:id	Get user by ID
PUT	/users/:id	Update user info
DELETE	/users/:id	Delete a user

🎮 Scores
Method	Endpoint	Description
POST	/scores	Add a new score
GET	/scores	Get all scores
GET	/scores/:id	Get a specific score
PUT	/scores/:id	Update a score
DELETE	/scores/:id	Delete a score

🧪 Example Requests
➕ Create User
bash
Copy code
POST /api/users
Content-Type: application/json
{
  "username": "ash",
  "email": "ash@pokemon.com"
}
🔍 Get All Users
bash
Copy code
GET /api/users
✏️ Update User
bash
Copy code
PUT /api/users/66fa9d123abc...
Content-Type: application/json
{
  "bestTime": 28,
  "bestMoves": 8,
  "totalGames": 17,
  "gamesWon": 14
}
🗑️ Delete User
bash
Copy code
DELETE /api/users/66fa9d123abc...
➕ Add Score
bash
Copy code
POST /api/scores
Content-Type: application/json
{
  "playerName": "ash",
  "time": 45,
  "moves": 10,
  "difficulty": "medium"
}
🔍 Get All Scores
bash
Copy code
GET /api/scores?difficulty=medium&sort=time&order=asc

