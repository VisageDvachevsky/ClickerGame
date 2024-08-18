const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  instagramSubscribed: { type: Boolean, default: false },
  telegramSubscribed: { type: Boolean, default: false },
  instagramRewardClaimed: { type: Boolean, default: false },
  telegramRewardClaimed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Challenge', challengeSchema);