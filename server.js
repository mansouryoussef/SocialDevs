const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false })); // Will allow us to get the data from the body

app.get('/', (req, res) => res.send('API RUNNING!'));

// Route definitions
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// env variable OR 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
