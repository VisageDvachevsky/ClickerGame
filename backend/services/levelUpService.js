const User = require('../models/user');
const HairStatus = require('../models/hairStatus');

const BACKGROUNDS_COUNT = 6;
const POINTS_PER_BACKGROUND = 10000;

const levelUp = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    const hairStatus = await HairStatus.findOne({ userId });

    if (!user || !hairStatus) {
      throw new Error('User or HairStatus not found');
    }

    const currentBackgroundIndex = Math.floor(user.points / POINTS_PER_BACKGROUND) % BACKGROUNDS_COUNT;
    
    if (currentBackgroundIndex === 0 && user.backgroundIndex === BACKGROUNDS_COUNT - 1) {
      user.level += 1;
      hairStatus.hairCount = 5000;
      hairStatus.resetScheduled = null;
    }

    user.backgroundIndex = currentBackgroundIndex;

    await user.save();
    await hairStatus.save();

    return { user, hairStatus };
  } catch (error) {
    console.error('Error in levelUp service:', error);
    throw error;
  }
};

module.exports = { levelUp };