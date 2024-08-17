const Coupon = require('../models/coupon');
const User = require('../models/user');
const QRCode = require('qrcode');

const crypto = require('crypto');

const generateUniqueCode = () => {
  return crypto.randomBytes(8).toString('hex');
};


const createQRCode = async (couponId) => {
  try {
    return await QRCode.toDataURL(couponId.toString());
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

const purchaseCoupon = async (userId, discountAmount) => {
    const user = await User.findOne({ userId });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    if (user.activeCoupon) {
      throw new Error('User already has an active coupon');
    }
  
    const couponCost = discountAmount * 10000;
  
    if (user.points < couponCost) {
      throw new Error('Insufficient points');
    }
  
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
  
    let code;
    let isUnique = false;
    while (!isUnique) {
      code = generateUniqueCode();
      const existingCoupon = await Coupon.findOne({ code });
      if (!existingCoupon) {
        isUnique = true;
      }
    }
  
    const newCoupon = new Coupon({
      code,
      userId,
      discount: discountAmount,
      expiresAt: expirationDate
    });
  
    await newCoupon.save();
  
    const qrCodeData = await createQRCode(newCoupon._id);
  
    user.points -= couponCost;
    user.activeCoupon = {
      couponId: newCoupon._id,
      discount: discountAmount,
      qrCode: qrCodeData,
      expiresAt: expirationDate
    };
  
    await user.save();
  
    return { qrCode: qrCodeData, newPoints: user.points };
  };

const validateCoupon = async (userId, couponId) => {
  const user = await User.findOne({ userId });

  if (!user || !user.activeCoupon || user.activeCoupon.couponId.toString() !== couponId) {
    throw new Error('Invalid coupon');
  }

  const coupon = await Coupon.findById(couponId);

  if (!coupon || coupon.isUsed) {
    throw new Error('Coupon has already been used');
  }

  if (coupon.expiresAt < new Date()) {
    throw new Error('Coupon has expired');
  }

  return { isValid: true, discount: coupon.discount };
};

const useCoupon = async (couponCode) => {
    const coupon = await Coupon.findOne({ _id: couponCode });
  
    if (!coupon) {
      throw new Error('Invalid coupon');
    }
  
    if (coupon.isUsed) {
      throw new Error('Coupon has already been used');
    }
  
    if (coupon.expiresAt < new Date()) {
      throw new Error('Coupon has expired');
    }
  
    coupon.isUsed = true;
    await coupon.save();
  
    const user = await User.findOne({ userId: coupon.userId });
    if (!user) {
      throw new Error('User not found');
    }
  
    user.activeCoupon = null;
    await user.save();
  
    return coupon.discount;
};

const checkActiveCoupon = async (userId) => {
    const user = await User.findOne({ userId });

    if (!user) {
        throw new Error('User not found');
    }

    return {
        hasCoupon: !!user.activeCoupon,
        coupon: user.activeCoupon
    };
};
  
const deleteExpiredCoupons = async () => {
  const now = new Date();
  await Coupon.deleteMany({ expiresAt: { $lte: now } });
};

const startCouponCleanupScheduler = () => {
  setInterval(deleteExpiredCoupons, 24 * 60 * 60 * 1000); 
};

module.exports = {
  purchaseCoupon,
  validateCoupon,
  useCoupon,
  checkActiveCoupon,
  startCouponCleanupScheduler
};