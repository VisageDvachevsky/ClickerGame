const express = require('express');
const router = express.Router();
const { purchaseCoupon, useCoupon, validateCoupon, checkActiveCoupon } = require('../controllers/couponController');

router.post('/purchaseCoupon', purchaseCoupon);
router.post('/useCoupon', useCoupon);
router.get('/validateCoupon', validateCoupon);
router.get('/checkActiveCoupon', checkActiveCoupon);

module.exports = router;