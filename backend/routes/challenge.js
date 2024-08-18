const express = require('express');
const router = express.Router();
const { 
  getChallenges, 
  claimInstagramChallenge, 
  claimTelegramChallenge 
} = require('../controllers/challengeController');

router.get('/challenges', getChallenges);
router.post('/claim-instagram-challenge', claimInstagramChallenge);
router.post('/claim-telegram-challenge', claimTelegramChallenge);

module.exports = router;