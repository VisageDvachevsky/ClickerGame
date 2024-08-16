const express = require('express');
const router = express.Router();
const { getCurrentBackground, updateBackground } = require('../controllers/backgroundController');

router.get('/getCurrentBackground', getCurrentBackground);
router.post('/updateBackground', updateBackground);

module.exports = router;