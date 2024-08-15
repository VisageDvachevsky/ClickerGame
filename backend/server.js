const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const hairStatusRoutes = require('./routes/hairStatus');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/API', authRoutes);
app.use('/API', hairStatusRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});