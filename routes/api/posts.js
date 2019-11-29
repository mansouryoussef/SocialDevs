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

// @route   POST api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		// Find all posts and sort by most recent
		const posts = await Post.find().sort({ date: -1 });

		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// @route   POST api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		// Find all posts and sort by most recent
		const post = await Post.findById(req.params.id);

		if (!post) return res.status(404).json({ msg: 'Post not found!' });
		res.json(post);
	} catch (err) {
		console.error(err);

		// If the error is related to ObjectId
		if (err.kind === 'ObjectId')
			return res.status(404).json({ msg: 'Post not found!' });

		// Otherwise
		res.status(500).send('Server error');
	}
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		// Find all posts and sort by most recent
		const post = await Post.findById(req.params.id);

		// if there is no post
		if (!post) {
			return res.status(404).json({ msg: 'Post not found!' });
		}

		// Check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorized' });
		}

		await post.remove();
		res.json({ msg: 'Post removed!' });
	} catch (err) {
		console.error(err);

		// If the error is related to ObjectId
		if (err.kind === 'ObjectId')
			return res.status(404).json({ msg: 'Post not found!' });

		res.status(500).send('Server error');
	}
});
module.exports = router;
