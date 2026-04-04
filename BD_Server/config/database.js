const mongoose = require('mongoose');
require("dotenv").config();

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
     
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1); // exit only if connection fails
  }
};
