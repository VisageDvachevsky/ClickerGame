const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileController');

router.get('/getP', getProfile);

module.exports = router;