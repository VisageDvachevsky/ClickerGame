const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  discount: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
  isUsed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Coupon', couponSchema);