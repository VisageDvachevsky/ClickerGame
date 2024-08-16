const mongoose = require('mongoose');

const hairStatusSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  hairCount: { type: Number, default: 0 },
  resetScheduled: { type: Date, default: null }, 
});

module.exports = mongoose.model('HairStatus', hairStatusSchema);
