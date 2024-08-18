const axios = require('axios');
const crypto = require('crypto');

function verifyTelegramWebAppData(initData) {
  const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN);
  const secretKey = secret.digest();
  const hash = initData.hash;
  delete initData.hash;
  const dataCheckString = Object.keys(initData)
    .sort()
    .map(k => `${k}=${initData[k]}`)
    .join('\n');
  const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  return hmac === hash;
}

async function checkTelegramSubscription(userId, channelUsername) {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getChatMember`, {
      params: {
        chat_id: `@${channelUsername}`,
        user_id: userId
      }
    });
    const chatMember = response.data.result;
    return ['member', 'administrator', 'creator'].includes(chatMember.status);
  } catch (error) {
    console.error('Error checking Telegram subscription:', error);
    return false;
  }
}

module.exports = { verifyTelegramWebAppData, checkTelegramSubscription };