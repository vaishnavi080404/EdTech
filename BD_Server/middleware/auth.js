const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.auth = async (req, res, next) => {
    console.log("Auth middleware triggered!");

    try {
        const authHeader = req.header("Authorization") || "";
        console.log("Incoming Authorization:", authHeader);

        const token =
            req.cookies?.token ||
            req.body?.token ||
            (authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

        console.log("Extracted Token:", token);

        if (!token) {
            console.log("Token is missing!");
            return res.status(401).json({
                success: false,
                code: "NO_TOKEN",
                message: "Token is not provided",
            });
        }

        // ✅ Verify token & handle errors properly
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);

                if (err.name === "TokenExpiredError") {
                    // ✅ Token expired → send special code
                    return res.status(401).json({
                        success: false,
                        code: "TOKEN_EXPIRED",
                        message: "Session expired. Please log in again.",
                    });
                }

                // ❌ Other JWT errors (invalid token, signature error, etc.)
                return res.status(401).json({
                    success: false,
                    code: "INVALID_TOKEN",
                    message: "Token is invalid",
                });
            }

            console.log("Decoded JWT:", decoded);
            req.user = decoded;
            console.log("req.user after decoding", req.user);
            next();
        });

    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(500).json({
            success: false,
            code: "SERVER_ERROR",
            message: "Something went wrong, please try again",
        });
    }
};



//isStudent middleware

exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Student' ){
            return res.status(403).json({
                 message: "This route is only for students" 
                });
        }
        next();    

    }catch(err){
        console.error(err);
        res.status(500).json({
             message: "User role cannot be verified"
            });

    }
}

//isInstructor middleware
// In /middleware/auth.js

exports.isInstructor = async (req, res, next) => {
    try {
        // We assume the 'auth' middleware has already run and added 'user' to the request
        const accountType = req.user.accountType;

        if (accountType !== "Instructor") {
            // --- THIS IS THE FIX ---
            // If the user is not an Instructor, stop immediately and
            // send a clear JSON error response.
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructors only.",
            });
            // --- END OF FIX ---
        }
        
        // If the check passes, proceed to the next function (the controller)
        next();

    } catch (error) {
        // This will catch any unexpected errors
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified. Please try again.",
        });
    }
};


//isAdmin middleware
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== 'Admin' ){
            return res.status(403).json({
                 message: "This route is only for Admin" 
                });
        }
        next();    

    }catch(err){
        console.error(err);
        res.status(500).json({
             message: "User role cannot be verified"
            });

    }
}