// Auth routes

const express = require('express');
const router = express.Router();

// @rout    GET api/auth
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;
