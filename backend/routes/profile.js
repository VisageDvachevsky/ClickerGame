const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileController');

router.get('/profile', getProfile);

module.exports = router;