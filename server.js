const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3000;

const Score = require('./models/Score');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Game modes configuration
const gameModes = {
    easy: { min: 1, max: 50, name: 'Easy (1-50)' },
    medium: { min: 1, max: 100, name: 'Medium (1-100)' },
    hard: { min: 1, max: 500, name: 'Hard (1-500)' }
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { gameModes });
});

app.get('/game', (req, res) => {
    const mode = req.query.mode || 'medium';
    const gameConfig = gameModes[mode];
    if (!gameConfig) {
        return res.redirect('/');
    }
    // Generate a random number based on mode
    const targetNumber = Math.floor(Math.random() * (gameConfig.max - gameConfig.min + 1)) + gameConfig.min;
    res.render('game', { targetNumber, attempts: 0, message: '', mode, gameConfig });
});

app.post('/game', async (req, res) => {
    const { guess, targetNumber, attempts, mode } = req.body;
    let message = '';
    let newAttempts = parseInt(attempts) + 1;
    const numGuess = parseInt(guess);
    const numTarget = parseInt(targetNumber);
    const gameConfig = gameModes[mode];

    // Debug logging
    console.log(`Guess: ${numGuess}, Target: ${numTarget}, Mode: ${mode}`);

    if (numGuess < numTarget) {
        message = 'Too low! Try again.';
    } else if (numGuess > numTarget) {
        message = 'Too high! Try again.';
    } else {
        message = `Congratulations! You guessed it in ${newAttempts} attempts.`;
        // Save to database
        try {
            const score = new Score({
                name: req.body.name || 'Anonymous',
                attempts: newAttempts,
                gameMode: mode
            });
            await score.save();
        } catch (err) {
            console.error('Error saving score:', err);
        }
        return res.render('game', { targetNumber: numTarget, attempts: newAttempts, message, guessed: true, mode, gameConfig });
    }

    res.render('game', { targetNumber: numTarget, attempts: newAttempts, message, mode, gameConfig });
});

app.get('/leaderboard', async (req, res) => {
    try {
        const scores = await Score.find().sort({ attempts: 1 }).limit(50);
        res.render('leaderboard', { scores, gameModes });
    } catch (err) {
        console.error('Error fetching leaderboard:', err);
        res.render('leaderboard', { scores: [], gameModes });
    }
});

app.listen(port, () => {
    console.log(`Gaming app listening at http://localhost:${port}`);
});