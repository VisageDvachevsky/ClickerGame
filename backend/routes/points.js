const express = require('express');
const router = express.Router();
const { getPoints, updatePoints } = require('../controllers/pointsController');

router.get('/getPoints', getPoints);
router.post('/updatePoints', updatePoints);

module.exports = router;