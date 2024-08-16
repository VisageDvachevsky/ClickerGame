const User = require('../models/user');
const { levelUp } = require('../services/levelUpService');

exports.getUserLevel = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ level: user.level });
    } catch (error) {
        console.error('Error fetching user level:', error);
        res.status(500).json({ error: 'Error fetching user level' });
    }
};

exports.updateLevel = async (req, res) => {
    const { userId } = req.body;
    try {
        const { user, hairStatus } = await levelUp(userId);

        res.json({
            success: true,
            level: user.level,
            backgroundIndex: user.backgroundIndex,
            hairCount: hairStatus.hairCount,
            resetScheduled: hairStatus.resetScheduled
        });
    } catch (error) {
        console.error('Error updating level:', error);
        res.status(500).json({ error: 'Error updating level' });
    }
};