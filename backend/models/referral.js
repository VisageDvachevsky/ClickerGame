const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    referralCode: { type: String, required: true, unique: true },
    referredUsers: [{ type: String }]
});

module.exports = mongoose.model('Referral', referralSchema);