const express = require('express');
const router = express.Router();
const { login, checkLogin } = require('../controllers/authController');

router.post('/login', login);
router.get('/check-login', checkLogin);

module.exports = router;