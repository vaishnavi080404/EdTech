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

        //  verify token & handle errors properly
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);

                if (err.name === "TokenExpiredError") {
                    // token expired → send special code
                    return res.status(401).json({
                        success: false,
                        code: "TOKEN_EXPIRED",
                        message: "Session expired. Please log in again.",
                    });
                }

            
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

exports.isInstructor = async (req, res, next) => {
    try {
        
        const accountType = req.user.accountType;

        if (accountType !== "Instructor") {

           
           
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructors only.",
            });
          
        }
        
       
        next();

    } catch (error) {
        
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