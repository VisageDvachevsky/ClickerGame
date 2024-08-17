const couponService = require('../services/couponService');

exports.purchaseCoupon = async (req, res) => {
    const { userId, discountAmount } = req.body;
  
    try {
      const result = await couponService.purchaseCoupon(userId, discountAmount);
      res.json({ success: true, ...result });
    } catch (error) {
      console.error('Error purchasing coupon:', error);
      res.status(400).json({ error: error.message });
    }
};
  
exports.validateCoupon = async (req, res) => {
    const { couponCode } = req.query;
  
    try {
      const result = await couponService.validateCoupon(couponCode);
      res.json(result);
    } catch (error) {
      console.error('Error validating coupon:', error);
      res.status(400).json({ error: error.message });
    }
};
  
exports.useCoupon = async (req, res) => {
    const { userId, couponCode } = req.body;
  
    try {
      const discount = await couponService.useCoupon(couponCode);
      res.json({ success: true, discount });
    } catch (error) {
      console.error('Error using coupon:', error.message);
      res.status(400).json({ error: error.message });
    }
};

exports.checkActiveCoupon = async (req, res) => {
    const { userId } = req.query;

    try {
        const result = await couponService.checkActiveCoupon(userId);
        res.json(result);
    } catch (error) {
        console.error('Error checking active coupon:', error);
        res.status(400).json({ error: error.message });
    }
};  