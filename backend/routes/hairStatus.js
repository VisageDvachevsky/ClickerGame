const express = require('express');
const router = express.Router();
const { removeHairBatch, getHairStatus, getTotalHairRemoved } = require('../controllers/hairStatusController');

router.post('/remove-hair-batch', removeHairBatch);
router.get('/hair-status', getHairStatus);
router.get('/getTotalHairRemoved', getTotalHairRemoved);

module.exports = router;