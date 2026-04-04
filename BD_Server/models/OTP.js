const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const { emailVerificationTemplate } = require('../mail/templates/emailVerification');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // 5 minutes
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Code",
      emailVerificationTemplate(otp) //using HTML template
    );
    console.log("✅ Email sent successfully:", mailResponse);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Failed to send verification email");
  }
}

OTPSchema.pre('save', async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model('OTP', OTPSchema);
