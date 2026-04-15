const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetUserHistory, handleDeleteURL } = require('../controllers/url');
const { verifyToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', optionalAuth, handleGenerateNewShortURL);
router.get('/history', verifyToken, handleGetUserHistory);
router.get('/analytics/:short_id', handleGetAnalytics);
router.delete('/:short_id', verifyToken, handleDeleteURL);

module.exports = router;