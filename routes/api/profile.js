// Profile routes

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		// Get profile
		const profile = await Profile.findOne({
			user: req.user.id // Find one by users id retured from auth
		}).populate('user', ['name', 'avatar']); // add new fields name and avatar from user

		// No profile
		if (!profile) {
			// Err
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.err(err.message);
		res.status(500).send('Server error');
	}
});

// @route   POST api/profile
// @desc    Create or update users profile
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'Title is required')
				.not()
				.isEmpty(),
			check('skills', 'Skills are required')
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

		// Pull everything out of the body
		const {
			company,
			website,
			location,
			bio,
			title,
			githubusername,
			skills,
			twitter,
			linkedin
		} = req.body;

		// Build profile object
		const profileFields = {};

		profileFields.user = req.user.id;

		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (title) profileFields.title = title;
		if (githubusername) profileFields.githubusername = githubusername;
		if (twitter) profileFields.twitter = twitter;
		if (linkedin) profileFields.linkedin = linkedin;

		if (skills) {
			// Split string input by ','
			// Map through the created arr and trim each value
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			// If there is a profile
			if (profile) {
				// Update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}

			// Create profile from Profile model
			profile = new Profile(profileFields);

			await profile.save(); // save profile

			res.json(profile); // send back the profile
		} catch (err) {
			console.error(err);
			res.send('Server error');
		}
	}
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id // Find by user id passed to the URL param
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'The is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);

		// Check for ObjectId err
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'The is no profile for this user' });
		}

		res.status(500).send('Server error');
	}
});

// @route   DELETE api/profile
// @desc    Delete Profile, User and Posts
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove profile
		await Profile.findOneAndRemove({
			user: req.user.id // Find by users id passed down by auth
		});

		// Remove user
		await User.findOneAndRemove({
			_id: req.user.id // Find by id passed down by auth in _id field
		});

		res.json({ msg: 'User deleted!' });
	} catch (err) {
		console.error(err.message);

		// Check for ObjectId err
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'The is no profile for this user' });
		}

		res.status(500).send('Server error');
	}
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is requirded')
				.not()
				.isEmpty(),
			check('company', 'Company is requirded')
				.not()
				.isEmpty(),
			check('from', 'From date is requirded')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);

		// Check for validation errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Pull out data
		const { title, company, from, to } = req.body;

		// Create an onj with the data that the user submits.
		const newExp = {
			title,
			company,
			from,
			to
		};

		try {
			// Find profile
			const profile = await Profile.findOne({ user: req.user.id });

			// Add to the beginning of the arr
			profile.experience.unshift(newExp);

			// Save
			await profile.save();

			// Send back the profile
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error!');
		}
	}
);

// @route   PUT api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		// Get remove index and match it with the exp_id param
		const removeIndex = profile.experience
			.map(item => item.id)
			.indexOf(req.params.exp_id);

		// Splice one with the removeIndex from the arr
		profile.experience.splice(removeIndex, 1);

		// Save
		await profile.save();

		// Send back the profile
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error!');
	}
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is requirded')
				.not()
				.isEmpty(),
			check('degree', 'Degree is requirded')
				.not()
				.isEmpty(),
			check('from', 'From date is requirded')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);

		// Check for validation errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Pull out data
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		} = req.body;

		// Create an onj with the data that the user submits.
		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		};

		try {
			// Find profile
			const profile = await Profile.findOne({ user: req.user.id });

			// Add to the beginning of the arr
			profile.education.unshift(newEdu);

			// Save
			await profile.save();

			// Send back the profile
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error!');
		}
	}
);

// @route   PUT api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		// Get remove index and match it with the edu_id param
		const removeIndex = profile.education
			.map(item => item.id)
			.indexOf(req.params.edu_id);

		// Splice one with the removeIndex from the arr
		profile.education.splice(removeIndex, 1);

		// Save
		await profile.save();

		// Send back the profile
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error!');
	}
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				'githubClientId'
			)}&client_secret=${config.get('githubSecret')}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' }
		};

		request(options, (error, response, body) => {
			// if error exists
			if (error) console.error(error);

			// if response is not status 200
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No github profile found' });
			}

			// Send back parsed json body
			res.json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
