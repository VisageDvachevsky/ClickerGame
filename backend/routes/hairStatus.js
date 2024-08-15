const express = require('express');
const router = express.Router();
const { removeHairBatch, getHairStatus } = require('../controllers/hairStatusController');

router.post('/remove-hair-batch', removeHairBatch);
router.get('/hair-status', getHairStatus);

module.exports = router;