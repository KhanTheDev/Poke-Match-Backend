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

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

