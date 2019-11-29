// Post routes

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post'); // Post model
const User = require('../../models/User'); // User model
const auth = require('../../middleware/auth'); // auth middleware

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('text', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		// Get errors
		const errors = await validationResult(req);

		// If there are errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			// Get the user without the password
			const user = await User.findById(req.user.id).select('-password');

			// Construct a new post obj
			const newPost = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};

			// Create a post from Post model
			const post = new Post(newPost);

			// Save
			await post.save();

			// Send back the post obj
			res.json(post);
		} catch (err) {
			console.error(err);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
