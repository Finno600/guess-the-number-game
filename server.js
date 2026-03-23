const express = require('express');
const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for leaderboard (in production, use a database)
let leaderboard = [];

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/game', (req, res) => {
    // Generate a random number between 1 and 100
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    res.render('game', { targetNumber, attempts: 0, message: '' });
});

app.post('/game', (req, res) => {
    const { guess, targetNumber, attempts } = req.body;
    let message = '';
    let newAttempts = parseInt(attempts) + 1;
    const numGuess = parseInt(guess);
    const numTarget = parseInt(targetNumber);

    if (numGuess < numTarget) {
        message = 'Too low! Try again.';
    } else if (numGuess > numTarget) {
        message = 'Too high! Try again.';
    } else {
        message = `Congratulations! You guessed it in ${newAttempts} attempts.`;
        // Add to leaderboard
        leaderboard.push({ name: req.body.name || 'Anonymous', attempts: newAttempts, date: new Date() });
        // Sort leaderboard by attempts (lower is better)
        leaderboard.sort((a, b) => a.attempts - b.attempts);
        // Keep only top 10
        leaderboard = leaderboard.slice(0, 10);
        return res.render('game', { targetNumber: numTarget, attempts: newAttempts, message, guessed: true });
    }

    res.render('game', { targetNumber: numTarget, attempts: newAttempts, message });
});

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { leaderboard });
});

app.listen(port, () => {
    console.log(`Gaming app listening at http://localhost:${port}`);
});