const User = require('../models/user');
const { levelUp } = require('../services/levelUpService');

exports.getCurrentBackground = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ backgroundIndex: user.backgroundIndex });
    } catch (error) {
        console.error('Error fetching current background:', error);
        res.status(500).json({ error: 'Error fetching current background' });
    }
};

exports.updateBackground = async (req, res) => {
    const { userId, points } = req.body;
    try {
        const { user: updatedUser, hairStatus } = await levelUp(userId);

        res.json({
            success: true,
            backgroundIndex: updatedUser.backgroundIndex,
            level: updatedUser.level,
            hairCount: hairStatus.hairCount,
            resetScheduled: hairStatus.resetScheduled
        });
    } catch (error) {
        console.error('Error updating background:', error);
        res.status(500).json({ error: 'Error updating background' });
    }
};