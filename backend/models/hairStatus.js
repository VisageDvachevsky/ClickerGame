const mongoose = require('mongoose');

const hairStatusSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  hairCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('HairStatus', hairStatusSchema);