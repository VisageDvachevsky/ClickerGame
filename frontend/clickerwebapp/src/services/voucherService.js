const EXCHANGE_RATE = 10000; // 10,000 hairs = $1
const MAX_EXCHANGE = 30000; // Maximum 30,000 hairs per exchange

export const exchangeHairForVoucher = (currentHairCount) => {
  const exchangeableHairs = Math.min(currentHairCount, MAX_EXCHANGE);
  const exchangeAmount = Math.floor(exchangeableHairs / EXCHANGE_RATE) * EXCHANGE_RATE;
  const newVouchers = exchangeAmount / EXCHANGE_RATE;
  
  return {
    newHairCount: currentHairCount - exchangeAmount,
    newVouchers: newVouchers
  };
};