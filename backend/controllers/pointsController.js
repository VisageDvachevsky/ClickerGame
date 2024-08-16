const User = require('../models/user'); 

exports.getPoints = async (req, res) => {
    const { userId } = req.query;
    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ points: user.points });
    } catch (error) {
        console.error('Error fetching points:', error);
        res.status(500).json({ error: 'Error fetching points' });
    }
};

exports.updatePoints = async (req, res) => {
    const { userId, points } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { userId },
            { $set: { points } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating points:', error);
        res.status(500).json({ error: 'Error updating points' });
    }
};
