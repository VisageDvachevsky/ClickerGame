const User = require('../models/user');
const Referral = require('../models/referral');
const crypto = require('crypto');

exports.generateReferralCode = async (req, res) => {
    try {
        const { userId } = req.body;
        let referral = await Referral.findOne({ userId });

        if (!referral) {
            const referralCode = crypto.randomBytes(3).toString('hex').toUpperCase();
            referral = new Referral({ userId, referralCode, referredUsers: [] });
            await referral.save();
        }

        res.json({ success: true, referralCode: referral.referralCode });
    } catch (error) {
        console.error('Error generating referral code:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getReferralCount = async (req, res) => {
    try {
        const { userId } = req.query;
        const referral = await Referral.findOne({ userId });

        if (referral) {
            res.json({ success: true, count: referral.referredUsers.length });
        } else {
            res.json({ success: true, count: 0 });
        }
    } catch (error) {
        console.error('Error getting referral count:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.applyReferralCode = async (req, res) => {
    try {
        const { userId, referralCode } = req.body;
        const referral = await Referral.findOne({ referralCode });

        if (referral && referral.userId !== userId) {
            if (!referral.referredUsers.includes(userId)) {
                referral.referredUsers.push(userId);
                await referral.save();

                // Reward the referrer
                const referrer = await User.findOne({ userId: referral.userId });
                if (referrer) {
                    referrer.points += 500; 
                    await referrer.save();
                }

                // Reward the new user
                const newUser = await User.findOne({ userId });
                if (newUser) {
                    newUser.points += 1000; 
                    await newUser.save();
                }

                res.json({ success: true, message: 'Referral code applied successfully' });
            } else {
                res.json({ success: false, message: 'You have already used this referral code' });
            }
        } else {
            res.json({ success: false, message: 'Invalid referral code' });
        }
    } catch (error) {
        console.error('Error applying referral code:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};