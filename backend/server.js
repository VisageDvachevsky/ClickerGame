const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const hairStatusRoutes = require('./routes/hairStatus');
const backgroundRoutes = require('./routes/background');
const pointsRoutes = require('./routes/points');
const levelRoutes = require('./routes/level');
const profileRouter = require('./routes/profile');
const couponRoutes = require('./routes/coupon');  
const referralsRoutes = require('./routes/referral');
const { connectDB } = require('./config/database');
const startDynamicScheduler = require('./services/hairResetService');
const { startCouponCleanupScheduler } = require('./services/couponService');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(cors());
app.use(express.json());

connectDB().catch(console.dir);;

app.use('/API', authRoutes);
app.use('/API', hairStatusRoutes);
app.use('/API', backgroundRoutes);
app.use('/API', pointsRoutes);
app.use('/API', levelRoutes);
app.use('/API', profileRouter);
app.use('/API', couponRoutes); 
app.use('/API', referralsRoutes);   

startDynamicScheduler();
startCouponCleanupScheduler();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, '../frontend/clickerwebapp/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/clickerwebapp/build', 'index.html'));
});
