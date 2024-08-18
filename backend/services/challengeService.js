const Challenge = require('../models/challenge');
const axios = require('axios');
const crypto = require('crypto');
const TelegramBot = require('node-telegram-bot-api');

const UserMapping = require('../models/userMapping');
const { verifyTelegramWebAppData, checkTelegramSubscription } = require('../utils/telegramApi');
const { checkInstagramSubscription } = require('../utils/instagramApi');


const INSTAGRAM_USERNAME = 'tina.electra';
const TELEGRAM_CHANNEL = 'tina_electra';
const INSTAGRAM_REWARD = 100;
const TELEGRAM_REWARD = 100;

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

const createOrGetChallenge = async (userId) => {
  try {
    let challenge = await Challenge.findOne({ userId });
    if (!challenge) {
      challenge = new Challenge({ userId });
      await challenge.save();
    }
    return challenge;
  } catch (error) {
    console.error('Error in createOrGetChallenge service:', error);
    throw error;
  }
};

async function checkInstagramSubscription(accessToken, instagramAccountId, username) {
  try {
    const response = await axios.get(`https://graph.instagram.com/${instagramAccountId}/followers?access_token=${accessToken}`);
    const followers = response.data.data;
    return followers.some(follower => follower.username.toLowerCase() === username.toLowerCase());
  } catch (error) {
    console.error('Error checking Instagram subscription:', error);
    return false;
  }
}

function verifyTelegramWebAppData(initData) {
    const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN);
    const secretKey = secret.digest();
    const hash = initData.hash;
    delete initData.hash;
    const dataCheckString = Object.keys(initData)
      .sort()
      .map(k => `${k}=${initData[k]}`)
      .join('\n');
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
    return hmac === hash;
  }
  
  async function checkTelegramSubscription(userId, channelUsername) {
    try {
      const response = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getChatMember`, {
        params: {
          chat_id: `@${channelUsername}`,
          user_id: userId
        }
      });
      const chatMember = response.data.result;
      return ['member', 'administrator', 'creator'].includes(chatMember.status);
    } catch (error) {
      console.error('Error checking Telegram subscription:', error);
      return false;
    }
  }

const claimTelegramReward = async (appUserId, initData) => {
    try {
      if (!verifyTelegramWebAppData(initData)) {
        return { success: false, message: 'Invalid Telegram Web App data' };
      }
  
      const userMapping = await UserMapping.findOne({ appUserId });
      if (!userMapping || !userMapping.telegramId) {
        return { success: false, message: 'User not properly mapped to Telegram' };
      }
  
      const challenge = await createOrGetChallenge(appUserId);
      
      if (challenge.telegramRewardClaimed) {
        return { success: false, message: 'Telegram reward already claimed' };
      }
  
      const isSubscribed = await checkTelegramSubscription(userMapping.telegramId, TELEGRAM_CHANNEL);
      if (isSubscribed) {
        challenge.telegramSubscribed = true;
        challenge.telegramRewardClaimed = true;
        await challenge.save();
        return { success: true, reward: TELEGRAM_REWARD };
      } else {
        return { success: false, message: 'Not subscribed to Telegram channel' };
      }
    } catch (error) {
      console.error('Error in claimTelegramReward service:', error);
      throw error;
    }
  };
  
  const claimInstagramReward = async (appUserId, instagramUsername) => {
    try {
      const userMapping = await UserMapping.findOne({ appUserId });
      if (!userMapping) {
        return { success: false, message: 'User not found' };
      }
  
      const challenge = await createOrGetChallenge(appUserId);
      
      if (challenge.instagramRewardClaimed) {
        return { success: false, message: 'Instagram reward already claimed' };
      }
  
      userMapping.instagramUsername = instagramUsername;
      await userMapping.save();
  
      const isSubscribed = await checkInstagramSubscription(
        process.env.INSTAGRAM_ACCESS_TOKEN,
        process.env.INSTAGRAM_ACCOUNT_ID,
        instagramUsername
      );
  
      if (isSubscribed) {
        challenge.instagramSubscribed = true;
        challenge.instagramRewardClaimed = true;
        await challenge.save();
        return { success: true, reward: INSTAGRAM_REWARD };
      } else {
        return { success: false, message: 'Not subscribed to Instagram' };
      }
    } catch (error) {
      console.error('Error in claimInstagramReward service:', error);
      throw error;
    }
  };

const getChallengeStatus = async (userId) => {
  try {
    const challenge = await createOrGetChallenge(userId);
    return {
      instagramChallenge: {
        completed: challenge.instagramSubscribed,
        rewardClaimed: challenge.instagramRewardClaimed,
        reward: INSTAGRAM_REWARD
      },
      telegramChallenge: {
        completed: challenge.telegramSubscribed,
        rewardClaimed: challenge.telegramRewardClaimed,
        reward: TELEGRAM_REWARD
      }
    };
  } catch (error) {
    console.error('Error in getChallengeStatus service:', error);
    throw error;
  }
};

module.exports = { 
  createOrGetChallenge, 
  claimInstagramReward, 
  claimTelegramReward, 
  getChallengeStatus 
};