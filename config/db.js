// DB connection

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false
		});

		// console.log('Connected to Mongo Atlas');
	} catch (e) {
		console.error(e.message);

		// Exit process with failures
		process.exit(1);
	}
};

module.exports = connectDB;
