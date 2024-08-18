const express = require('express');
const router = express.Router();
const { generateReferralCode, getReferralCount, applyReferralCode } = require('../controllers/referralController');

router.post('/referral/generate-code', generateReferralCode);
router.get('/referral/count', getReferralCount);
router.post('/apply-referral-code', applyReferralCode);

module.exports = router;