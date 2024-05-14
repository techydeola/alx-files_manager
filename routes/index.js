import express from 'express';
import { postNew, getMe } from '../controllers/UsersController';
import { getStatus, getStats } from '../controllers/AppController';
import { getConnect, getDisconnect } from '../controllers/AuthController'

const router = express.Router();

// handles get request for /status
router.get('/status', getStatus);

// handles get request for /stats
router.get('/stats', getStats);

// handles post request for adding new users
router.post('/users', postNew);

// handles get request for /connect
router.get('/connect', getConnect);

// handles get request for /connect
router.get('/disonnect', getDisconnect);

// handles get request for /connect
router.get('/users/me');

module.exports = router;
