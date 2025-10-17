const User =require('../models/user');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto =require("crypto");
const { passwordUpdatedTemplate } = require("../mail/templates/passwordUpdate");


exports.resetPasswordToken = async (req, res) => {
 try{
       //get email from request body
    const { email } = req.body;
    //check if user exists with given email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            success: false,
             message: 'Your email is not registered ,User not found' });
    }
    //generate a unique token
    const token = crypto.randomUUID();

    //update user by adding the token
    const updatedDetails = await User.findOneAndUpdate({ email:email }, { token: token, resetPasswordExpries: Date.now() + 5*60*1000, }, { new: true });
//create a link with token for user to click
    const url = `http://localhost:5173/update-password/${token}`;

    //send the email with the link
    await mailSender(email, 'Password Reset Link', `Click on the link below to reset your password: ${url}`);

    return res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email'
    })


 }catch(error){
     return res.status(500).json({
        success: false,
        message: 'Something went wrong, while resetting password'
    })

 }
}

//reset password

exports.resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match',
            });
        }

        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'Token is invalid',
            });
        }

        if (userDetails.resetPasswordExpries < Date.now()) {
            return res.status(400).json({
                success: false,
                message: 'Token has expired',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword, token: undefined, resetPasswordExpries: undefined },
            { new: true }
        );

        // ✅ Send confirmation email
        await mailSender(
            updatedUser.email,
            "Password Changed Successfully",
            passwordUpdatedTemplate(`${updatedUser.firstName} ${updatedUser.lastName || ""}`)
        );

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully and confirmation email sent',
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while resetting password',
            error: error.message,
        });
    }
};
