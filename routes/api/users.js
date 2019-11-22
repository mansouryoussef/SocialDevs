// User routes

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
// @rout    POST api/users
// @desc    Register user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Name is required!') // check name & set error msg
			.not()
			.isEmpty(),
		check('email', 'Please enter a valid email!') // check if email is valid & set error msg
			.isEmail(),
		check('password', 'Required 6 or more characters') // check if password is long enough
			.isLength({ min: 6 })
	],
	(req, res) => {
		// get errors
		const errors = validationResult(req);

		// if there are errors
		if (!errors.isEmpty()) {
			// Set status to 400 and send errors array
			return res.status(400).json({ errors: errors.array() });
		}
		res.send('User route');
	}
);

module.exports = router;
