// DB connection

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true
		});

		console.log('Connected to Mongo Atlas');
	} catch (e) {
		console.error(e.message);

		// Exit process with failures
		process.exit(1);
	}
};

module.exports = connectDB;
