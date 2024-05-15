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
router.get('/users/me', getMe);

// handles get request for /files
router.post('/files', FilesController.postUpload);

// handles get request for /files/:id
router.get('/files/:id', FilesController.getShow);

// handles get request for /files
router.get('/files', FilesController.getIndex);

// handles get request for /files/:id/publish
router.put('/files/:id/publish', FilesController.putPublish);

// handles get request for /files/:id/unpublish
router.put('/files/:id/unpublish', FilesController.putUnpublish);

// handles get request for /files/:id/data
router.get('/files/:id/data', FilesController.getFile);

module.exports = router;
