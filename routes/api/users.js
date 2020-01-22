// User routes

const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../../models/User'); // User model

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
	'/',
	// Middleware
	[
		check('name', 'Name is required!') // check name & set error msg
			.not()
			.isEmpty(),
		check('email', 'Email is required!') // check if email is not empty
			.not()
			.isEmpty(),
		check('email', 'Email is invalid!') // check if email is valid & set error msg
			.isEmail(),
		check('password', 'Password 6+ characters') // check if password is long enough
			.isLength({ min: 6 })
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
		const { name, email, password } = req.body;

		try {
			// Check if user exists
			let user = await User.findOne({ email });

			// If there is a user BAD
			if (user) {
				// send status 400 and errors array with error msg
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			// Get users gravatar from email
			const avatar = gravatar.url(email, {
				s: '200', // size: "200"
				r: 'pg', // rating: "pg" ( no 18+ avatars )
				d: 'mm' // Default: "mm" ( placeholder icon )
			});

			// Create new instance of User model with current values
			user = new User({
				name,
				email,
				avatar,
				password
			});

			// Encrypt the password
			const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
			user.password = await bcrypt.hash(password, salt); // Hash the password
			await user.save(); // Save user to database

			// Return the json web token

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
				jwtSecret, // secret
				{ expiresIn: 3600000 }, // expiration
				// callback with err OR token
				(err, token) => {
					if (err) throw err; // check for err
					res.json({ token }); // send token
				}
			);
		} catch (err) {}
	}
);

module.exports = router;
