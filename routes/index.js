const express = require('express');
const { app_status, app_stats } = require('../controller/AppController');

const router = express.Router();

// handles get request for /status
router.get('/status', app_status);

// handles get request for /stats
router.get('/stats', app_stats);

module.exports = router;
