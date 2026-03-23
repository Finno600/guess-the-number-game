# Guess the Number Game

A multi-mode number guessing game built with Node.js, Express.js, EJS, and MongoDB.

## Features

- Multiple difficulty levels: Easy (1-50), Medium (1-100), Hard (1-500)
- Persistent leaderboard stored in MongoDB
- Real-time feedback and attempt tracking
- Responsive design with modern UI
- Player name support

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- MongoDB with Mongoose
- HTML/CSS

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Make sure MongoDB is running locally on port 27017
4. Run `npm start` to start the server
5. Open `http://localhost:3000` in your browser

## Prerequisites

- Node.js installed
- MongoDB installed and running locally, or update the connection string for MongoDB Atlas

## How to Play

1. Choose a difficulty level on the home page
2. Enter your name (optional) and start guessing
3. The app will tell you if your guess is too high or too low
4. Keep guessing until you get it right
5. Your score will be saved to the global leaderboard

## Project Structure

- `server.js` - Main server file with Express routes
- `models/Score.js` - MongoDB schema for scores
- `views/` - EJS templates
- `public/` - Static files (CSS)

This project demonstrates full-stack development skills including backend API, database integration, and frontend templating.