const axios = require('axios');

async function checkInstagramSubscription(accessToken, instagramAccountId, username) {
  try {
    const response = await axios.get(`https://graph.instagram.com/${instagramAccountId}/followers?access_token=${accessToken}`);
    const followers = response.data.data;
    return followers.some(follower => follower.username.toLowerCase() === username.toLowerCase());
  } catch (error) {
    console.error('Error checking Instagram subscription:', error);
    return false;
  }
}

module.exports = { checkInstagramSubscription };