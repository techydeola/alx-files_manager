const express = require('express');
const { postNew } = require('../controller/UsersController.js');
const { getStatus, getStats } = require('../controller/AppController');

const router = express.Router();

// handles get request for /status
router.get('/status', getStatus);

// handles get request for /stats
router.get('/stats', getStats);

// handles post request for adding new users
router.post('/users', postNew);

module.exports = router;
