const User = require('../models/user'); 

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
    const { userId, backgroundIndex } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { userId },
            { $set: { backgroundIndex } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating background:', error);
        res.status(500).json({ error: 'Error updating background' });
    }
};
