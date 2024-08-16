const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const hairStatusRoutes = require('./routes/hairStatus');
const { connectDB } = require('./config/database');
const startDynamicScheduler = require('./services/hairResetService');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/API', authRoutes);
app.use('/API', hairStatusRoutes);

startDynamicScheduler();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, '../frontend/clickerwebapp/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/clickerwebapp/build', 'index.html'));
});
