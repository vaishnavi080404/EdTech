require("dotenv").config(); // Load env variables

const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,      // ✅ env variable
  key_secret: process.env.RAZORPAY_SECRET  // ✅ env variable
});

module.exports = instance;
