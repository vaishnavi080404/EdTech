const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }],
  amount: {
    type: Number,
    required: true,
  },
  // We can also store the Razorpay IDs for reference
  orderId_razorpay: {
    type: String,
    required: true,
  },
  paymentId_razorpay: {
    type: String,
  },
}, { timestamps: true }); // timestamps adds createdAt and updatedAt fields

module.exports = mongoose.model("Order", orderSchema);