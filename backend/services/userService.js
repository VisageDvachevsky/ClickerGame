const UserMapping = require('../models/userMapping');

async function createOrUpdateUserMapping(appUserId, telegramId) {
  try {
    let userMapping = await UserMapping.findOne({ appUserId });
    if (!userMapping) {
      userMapping = new UserMapping({ appUserId, telegramId });
    } else {
      userMapping.telegramId = telegramId;
    }
    await userMapping.save();
    return userMapping;
  } catch (error) {
    console.error('Error in createOrUpdateUserMapping:', error);
    throw error;
  }
}