const Referral = require('../models/referral');
const User = require('../models/user');
const crypto = require('crypto');

const generateReferralCode = (userId) => {
  return crypto.createHash('md5').update(userId + Date.now().toString()).digest('hex').substring(0, 8);
};

const createReferral = async (userId) => {
  try {
    let referral = await Referral.findOne({ userId });
    if (!referral) {
      const referralCode = generateReferralCode(userId);
      referral = new Referral({ userId, referralCode });
      await referral.save();
    }
    return referral;
  } catch (error) {
    console.error('Error in createReferral service:', error);
    throw error;
  }
};

const addReferredUser = async (referralCode, newUserId) => {
  try {
    const referral = await Referral.findOne({ referralCode });
    if (!referral) {
      throw new Error('Invalid referral code');
    }
    if (!referral.referredUsers.includes(newUserId)) {
      referral.referredUsers.push(newUserId);
      await referral.save();
    }
    return referral;
  } catch (error) {
    console.error('Error in addReferredUser service:', error);
    throw error;
  }
};

const getReferralCount = async (userId) => {
  try {
    const referral = await Referral.findOne({ userId });
    return referral ? referral.referredUsers.length : 0;
  } catch (error) {
    console.error('Error in getReferralCount service:', error);
    throw error;
  }
};

module.exports = { createReferral, addReferredUser, getReferralCount };