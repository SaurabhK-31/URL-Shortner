const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:short_id', handleGetAnalytics);

module.exports = router;
