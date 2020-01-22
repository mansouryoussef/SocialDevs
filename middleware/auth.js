// Middleware that takes token from header
// decodes it
// returns the saved user object in payload

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if no token
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' });

	// Verify the token
	try {
		// Get JWT secret from env
		const jwtSecret = process.env.JWT_SECRET;

		// Decode the token
		const decoded = jwt.verify(token, jwtSecret);

		// Take the req object and assign a value to user
		req.user = decoded.user;

		next();
	} catch (err) {
		// will run if the token is not valid
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
