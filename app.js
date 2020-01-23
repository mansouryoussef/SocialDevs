const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false })); // Will allow us to get the data from the body

// Route definitions
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static build in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('social-devs-frontend/build'));

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'social-devs-frontend', 'build', 'index.html')
		);
	});
}

module.exports = app;
