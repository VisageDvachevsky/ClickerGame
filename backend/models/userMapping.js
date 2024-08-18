const mongoose = require('mongoose');

const userMappingSchema = new mongoose.Schema({
  appUserId: { type: String, required: true, unique: true },
  telegramId: { type: String, unique: true, sparse: true },
  instagramUsername: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model('UserMapping', userMappingSchema);