const express = require('express');
const { handleRegister, handleLogin, handleLogout, handleMe } = require('../controllers/auth');

const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.get('/me', handleMe);

module.exports = router;
