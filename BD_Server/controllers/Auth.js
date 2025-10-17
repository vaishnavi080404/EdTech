//send otp
const User = require('../models/user');
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpTemplate = require('../mail/templates/emailVerification');
const mailSender = require('../utils/mailSender');
const { passwordUpdatedTemplate } = require('../mail/templates/passwordUpdate');
require('dotenv').config();
const admin = require('firebase-admin');


exports.sendOtp = async (req, res) => {

    try{
            //fetch email from request body
    const {email} = req.body;
    //check if user with this email exists
    const checkUserPresent = await User.findOne({email});
    //if user already exists, return res
    if(checkUserPresent) {
        return res.status(400).json({
        success: false,
        message: "User already exists with this email"
    });
}

    //generate random otp

    let otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false, 
        specialChars: false 
    });
    console.log("Generated OTP: ", otp);

    //check otp is unique or not
    let result = await OTP.findOne({otp: otp});

    while(result) {
        //if otp is already used, generate new one
        otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false, 
            specialChars: false 
        });
       
        result = await OTP.findOne({otp: otp});//its not a good practice/logic to check if otp is unique every time (should use library), loop callson db is not good

    }

    //save in db
    const otpPlayload ={email, otp};

    const otpBody =await OTP.create(otpPlayload);
    console.log(otpBody);

    //return response successfully
    res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otp,
    });

 }catch(err){
        return res.status(500).json({
            success: false,
            message: "Server Error",
             error: err.message, 
            
            

        });
    }

       
}


//signup
exports.signup = async (req, res) => {
    try{

        //fetch email, password and role from request body
        const {firstName,
            lastName,
            email, 
            password,
            confirmPassword,
            contactNumber, 
            accountType,
            otp
        } = req.body;

        //validate the data
        if(!firstName ||!lastName ||!email ||!password ||!confirmPassword ||!otp){
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        //password n confirm password matches
        if(password!== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match"
            });
        }

        //check if user with this email exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }

       // find most recent otp
const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

if (!recentOtp) {
  return res.status(400).json({
    success: false,
    message: "OTP not found or expired",
  });
}

if (otp !== recentOtp.otp.toString()) {
  return res.status(400).json({
    success: false,
    message: "Invalid OTP",
  });
}

        //hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        //entry create in db

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber:null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, // api to generate initials as profile image
            
        })

        //return response successfully
        res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        });
 


    }catch(err){
        return res.status(500).json({
            success: false,
            message: "User Registration Failed",
             error: err.message, 
        });
    }
}


//login 
// exports.login = async (req, res) => {
//     try{
//         //fetch email and password from request body
//         const {email, password} = req.body;
//         //validate the data
//         if(!email ||!password){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill all fields"
//             });
//         }
//         //user exists already or not
//         const user = await User.findOne({email}).populate('additionalDetails');
//         if(!user){
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         //password matches or not
//                if (await bcrypt.compare(password, user.password)){

           
//           const token=jwt.sign(
//             {
//               email:user.email,id:user._id,accountType:user.accountType
//             },
//             process.env.JWT_SECRET,{
//               expiresIn:"4s"
//             }
//           );
//           //save token to document in db
//           user.token;
//           user.password=undefined;


//             //cookie generation
//             const options = {
//                 expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // token expires in 24h
//                 httpOnly: true,
//             }
//             res.cookie('token', token, options).status(200).json({
//                 success: true,
//                 token,
//                 message: "User is logged in successfully",
//                 user,

//             });
//         }
//         else{
//             return res.status(400).json({
//                 success: false,
//                 message: "Incorrect Password"
//             });
//         }


        

//     }catch(err){
//         return res.status(500).json({
//             success: false,
//             message: "Login Failed",
//             error: err.message,

//         });
//     }
// }




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }
        
        const user = await User.findOne({ email }).populate('additionalDetails').exec();
        if (!user) {
            return res.status(401).json({ // Use 401 for auth errors
                success: false,
                message: "Invalid credentials"
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h" // Use a reasonable expiration time
            });

            // Make a copy of the user object to modify it
            const userDetails = user.toObject();
            userDetails.token = token;
            userDetails.password = undefined; // Remove password from the response object

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            };

            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user: userDetails, // Send the modified user object
                message: "User logged in successfully",
            });
        } else {
            return res.status(401).json({ // Use 401 for auth errors
                success: false,
                message: "Invalid credentials"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Login Failed",
            error: err.message,
        });
    }
}






exports.verifyGoogleToken = async (req, res) => {
    try {
        const { token, accountType, intent } = req.body; // 1. Get the new 'intent' flag

        if (!token || !intent) {
            return res.status(400).json({ success: false, message: "Token and intent are required." });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const { name, picture, email } = decodedToken;
        
        let user = await User.findOne({ email }).populate("additionalDetails").exec();

        // --- THIS IS THE GUARANTEED FIX ---
        if (user) {
            // CASE 1: User already exists in the database.
            
            if (intent === 'signup') {
                // If they already exist but are trying to SIGN UP, this is an error.
                console.log("Attempted Google signup for existing user:", email);
                return res.status(400).json({
                    success: false,
                    message: "User with this email already exists. Please sign in instead.",
                });
            }

            // If the intent was 'login', then this is correct. Proceed to log them in.
            console.log(`Existing ${user.accountType} user signed in:`, user.email);

        } else {
            // CASE 2: User does not exist in the database.

            if (intent === 'login') {
                // If they don't exist but are trying to SIGN IN, this is an error.
                console.log("Attempted Google signin for non-existent user:", email);
                return res.status(404).json({
                    success: false,
                    message: "User not found. Please sign up first.",
                });
            }
            
            // If the intent was 'signup', this is correct. Proceed to create the user.
            console.log("Creating new user via Google signup...");
            if (!accountType) { /* ... check for accountType ... */ }

            const nameParts = name.split(' ');
            const profileDetails = await Profile.create({ /* ... */ });
            
            user = await User.create({
                firstName: nameParts[0],
                lastName: nameParts.slice(1).join(' ') || nameParts[0],
                email,
                image: picture,
                accountType: accountType,
                additionalDetails: profileDetails._id,
            });
            
            user = await User.findById(user._id).populate("additionalDetails").exec();
        }
        // --- END OF FIX ---

        // If we've reached here, the user is valid (either found or newly created).
        // Create and return the JWT.
        const payload = { email: user.email, id: user._id, accountType: user.accountType };
        const appToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        const userDetails = user.toObject();
        userDetails.token = appToken;
        userDetails.password = undefined;

        return res.status(200).json({
            success: true,
            token: appToken,
            user: userDetails,
            message: "Authentication successful.",
        });

    } catch (error) {
        console.error("❌ GOOGLE AUTHENTICATION FAILED:", error);
        return res.status(500).json({
            success: false,
            message: "Authentication failed. Please try again.",
        });
    }
};


//change password

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;
    console.log("objects", req.body);
    console.log("Stored password in DB:", userDetails.password);
console.log("Password entered:", oldPassword);

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false,
           message: "The password is incorrect",
           
           });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
  updatedUserDetails.email,
  "Password Updated Successfully",
  `Hello ${updatedUserDetails.firstName}, your password has been updated successfully.`
);

				passwordUpdatedTemplate(`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`)

			 
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
