const express = require('express');
const router =express.Router();
const {auth}= require('../middleware/auth');

const {
    login,
    signup,
    sendOtp ,
    changePassword,
    verifyGoogleToken
}= require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword,
}= require('../controllers/ResetPassword');


//routes for login signup and authentication
//authentication middleware



router.post('/login', login);
router.post('/signup', signup);
router.post('/sendotp', sendOtp );
router.post('/changepassword', auth, changePassword);


//routes for password reset

router.post('/reset-password-token', resetPasswordToken);//route for generating token
router.post('/reset-password', resetPassword); //route for resetting password after verification
router.post('/verify-google-token', verifyGoogleToken);



module.exports = router;
