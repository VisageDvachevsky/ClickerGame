const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  backgroundIndex: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
});

module.exports = mongoose.model('User', userSchema);