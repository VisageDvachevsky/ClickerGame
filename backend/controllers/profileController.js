const User = require('../models/user');
const HairStatus = require('../models/hairStatus');

exports.getProfile = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findOne({ userId });
        const hairStatus = await HairStatus.findOne({ userId });

        if (!user || !hairStatus) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            userId: user.userId,
            hairCount: hairStatus.hairCount,
            points: user.points,
            level: user.level,
            activeCoupon: user.activeCoupon
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
};