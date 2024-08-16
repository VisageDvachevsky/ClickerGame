const HairStatus = require('../models/hairStatus');

exports.removeHairBatch = async (req, res) => {
  try {
      const { batch } = req.body;

      for (const item of batch) {
          const { userId, removedHair } = item;
          let hairStatus = await HairStatus.findOne({ userId });

          if (!hairStatus) {
              console.warn(`User not found: ${userId}`);
              continue;
          }

          hairStatus.hairCount = Math.max(0, hairStatus.hairCount - removedHair);
          
          hairStatus.totalHairRemoved += removedHair;

          const resetTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
          hairStatus.resetScheduled = resetTime;
          await hairStatus.save();
      }

      res.json({ success: true });
  } catch (error) {
      console.error('Remove hair batch error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getHairStatus = async (req, res) => {
  try {
    const { userId } = req.query;
    const hairStatus = await HairStatus.findOne({ userId });

    if (!hairStatus) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ hairCount: hairStatus.hairCount });
  } catch (error) {
    console.error('Get hair status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getTotalHairRemoved = async (req, res) => {
  try {
    const { userId } = req.query;
    const hairStatus = await HairStatus.findOne({ userId });

    if (!hairStatus) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
      totalHairRemoved: hairStatus.totalHairRemoved 
    });
  } catch (error) {
    console.error('Get total hair removed error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
