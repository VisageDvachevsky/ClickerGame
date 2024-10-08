const express = require('express');
const router = express.Router();
const { login, checkLogin } = require('../controllers/authController');
const { generateReferralCode, getReferralCount, applyReferralCode } = require('../controllers/referralController');

router.post('/login', login);
router.get('/check-login', checkLogin);
router.post('/generate-referral-code', generateReferralCode);
router.get('/referral-count', getReferralCount);
router.post('/apply-referral-code', applyReferralCode);

module.exports = router;