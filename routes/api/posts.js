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
		// Find post by id
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
		// Find post by id
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

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		// Find post by id
		const post = await Post.findById(req.params.id);

		// Check if the post is already liked
		if (
			// Filter out all likes that match the user id then check length of returned value if it's greater than 0
			post.likes.filter(like => like.user.toString() === req.user.id).length > 0
		) {
			return res.status(400).json({ msg: 'Already liked this post' });
		}

		post.likes.unshift({ user: req.user.id }); // Add the user how liked to the arr

		await post.save();

		//Send back the likes arr
		res.json(post.likes);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		// Find post by id
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found!' });
		}

		// Check if the post hasn't been liked
		if (
			// Filter out all likes that match the user id then check length of returned value if it's equal to 0
			post.likes.filter(like => like.user.toString() === req.user.id).length ===
			0
		) {
			return res.status(400).json({ msg: "Post hasn't been liked yet" });
		}

		post.likes.forEach((like, i) => {
			if (like.user.toString() === req.user.id) {
				post.likes.splice(i, 1);
			}
		});

		await post.save();

		//Send back the likes arr
		res.json(post.likes);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

// router.delete('/unlike/:id', auth, async (req, res) => {
// 	const post = await Post.findById(req.params.id);

// 	if (!post) {
// 		return res.status(404).json({ msg: 'Post not found!' });
// 	}
// 	try {
// 		const found = post.likes.find(like => {
// 			return like.user.toString() === req.user.id;
// 		});

// 		if (found === undefined) {
// 			return res.status(404).json({ msg: "You haven't liked this post" });
// 		}

// 		post.likes.forEach((like, i) => {
// 			if (like.user.toString() === req.user.id) {
// 				post.likes.splice(i, 1);
// 			}
// 		});
// 		console.log(found);
// 		await post.save();
// 		res.json({ msg: 'Like removed!' });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send('Server error');
// 	}
// });
module.exports = router;
