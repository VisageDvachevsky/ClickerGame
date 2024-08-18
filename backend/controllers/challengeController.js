const { 
    claimInstagramReward, 
    claimTelegramReward, 
    getChallengeStatus 
  } = require('../services/challengeService');
  
  exports.getChallenges = async (req, res) => {
    const { userId } = req.query;
    try {
      const status = await getChallengeStatus(userId);
      res.json(status);
    } catch (error) {
      console.error('Error getting challenges:', error);
      res.status(500).json({ error: 'Error getting challenges' });
    }
  };
  
  exports.claimTelegramChallenge = async (req, res) => {
    const { appUserId, initData } = req.body;
    try {
      const result = await claimTelegramReward(appUserId, initData);
      res.json(result);
    } catch (error) {
      console.error('Error claiming Telegram challenge:', error);
      res.status(500).json({ error: 'Error claiming Telegram challenge' });
    }
  };
  
  exports.claimInstagramChallenge = async (req, res) => {
    const { appUserId, instagramUsername } = req.body;
    try {
      const result = await claimInstagramReward(appUserId, instagramUsername);
      res.json(result);
    } catch (error) {
      console.error('Error claiming Instagram challenge:', error);
      res.status(500).json({ error: 'Error claiming Instagram challenge' });
    }
  };