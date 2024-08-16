const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

router.get('/getUserLevel', levelController.getUserLevel);
router.post('/updateLevel', levelController.updateLevel);

module.exports = router;