// Auth routes

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth'); // auth middleware
const User = require('../../models/User'); // User model

// @route   GET api/auth
// @desc    Get authenticated user's data
// @access  Public
router.get('/', auth, async (req, res) => {
	try {
		// find the user by the id the auth middleware provides.
		// remove password field.
		const user = await User.findById(req.user.id).select('-password');

		// send back the user object
		res.json(user);
	} catch (e) {
		// console the error msg
		console.error(err.message);
		// send 500 status and Sever error
		res.status(500).send('Server error');
	}
});

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
	'/',
	// Middleware
	[
		check('email', 'Email is required!') // check if email is not empty
			.not()
			.isEmpty(),
		check('email', 'Please enter a valid email!') // check if email is valid & set error msg
			.isEmail(),
		check('password', 'Password is required!') // check if password is not empty
			.not()
			.isEmpty()
	],

	async (req, res) => {
		// get errors
		const errors = validationResult(req);

		// if there are errors
		if (!errors.isEmpty()) {
			// Send status to 400 and send errors array
			return res.status(400).json({ errors: errors.array() });
		}

		// Pull out required info from the reqests body
		const { email, password } = req.body;

		try {
			// Find user by email
			let user = await User.findOne({ email });

			// If there is no user
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Wrong email or password!' }] });
			}

			// compare entered password with the found user's hashed password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				// send status 400 and errors array with error msg
				return res
					.status(400)
					.json({ errors: [{ msg: 'Wrong email or password!' }] }); // don't specify which is wrong
			}

			// Get payload with user id
			const payload = {
				user: {
					id: user.id // _id
				}
			};

			// Get JWT secret from env
			const jwtSecret = process.env.JWT_SECRET;

			// sign a token
			jwt.sign(
				payload,
				jwtSecret,

				(err, token) => {
					if (err) throw err; // check for err
					res.json({ token }); // send token
				}
			);
		} catch (err) {}
	}
);

module.exports = router;
