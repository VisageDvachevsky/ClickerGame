const User = require('../models/user');
const HairStatus = require('../models/hairStatus');

exports.login = async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
      await user.save();

      const hairStatus = new HairStatus({ userId, hairCount: 5000 }); 
      await hairStatus.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.checkLogin = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findOne({ userId });

    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Check login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};