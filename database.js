const mongoose = require('mongoose');

// Use environment variable when available; fall back to local MongoDB for dev.
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/org_api';

// Connect to MongoDB using Mongoose.
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
