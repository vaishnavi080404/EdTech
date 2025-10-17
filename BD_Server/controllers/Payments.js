// In BD_Server/controllers/Payment.js

const instance = require('../config/razorpay');
const Course = require('../models/course');
const User = require('../models/user');
const mailSender = require('../utils/mailSender');
const mongoose = require('mongoose');
const crypto = require("crypto");
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessfulEmail");
const CourseProgress = require('../models/courseProgress');
const Order = require('../models/order');

// --- 1. Capture the payment and initiate the Razorpay order ---
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.json({ success: false, message: "Please provide Course ID" });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({ success: false, message: "Could not find the course" });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: "Student is already enrolled in the course" });
            }

            totalAmount += course.price;

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Could not Initiate Order" });
    }
};


// --- 2. Verify the payment and handle all post-payment actions ---
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({ success: false, message: "Payment Failed: Missing required fields" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        try {
            // Enroll student(s) and get the student object back
            const enrolledStudent = await enrollStudents(courses, userId);

            if (!enrolledStudent) {
                return res.status(500).json({ success: false, message: "Could not enroll student." });
            }
            
            // Create the Order record
            let totalAmount = 0;
            for (const courseId of courses) {
                const course = await Course.findById(courseId);
                if (course) { totalAmount += course.price; }
            }
            await Order.create({
                user: userId,
                courses: courses,
                amount: totalAmount,
                orderId_razorpay: razorpay_order_id,
                paymentId_razorpay: razorpay_payment_id,
            });

            // Send the Payment Success Email
            await mailSender(
                enrolledStudent.email,
                `Payment Successful - Your EdTech Order`,
                paymentSuccessEmail(
                    `${enrolledStudent.firstName}`,
                    totalAmount,
                    razorpay_order_id,
                    razorpay_payment_id
                )
            );
            console.log("✅ Payment Success Email sent successfully.");

            return res.status(200).json({ success: true, message: "Payment Verified" });
        
        } catch (error) {
            console.error("Error in verifyPayment:", error);
            return res.status(500).json({ success: false, message: "An internal error occurred." });
        }
    }
    return res.status(400).json({ success: false, message: "Payment Verification Failed" });
};


// --- 3. Helper function to enroll students and create progress ---
const enrollStudents = async (courses, userId) => {
    try {
        const enrolledStudent = await User.findById(userId);
        if (!enrolledStudent) {
            throw new Error("Student not found");
        }

        for (const courseId of courses) {
            // Find course and enroll student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                console.warn(`Course with ID ${courseId} not found during enrollment.`);
                continue; 
            }

            // Create the CourseProgress document
            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            });

            if (!courseProgress) {
                console.error(`Failed to create CourseProgress for user ${userId} and course ${courseId}`);
                continue;
            }
            console.log(`✅ CourseProgress created: ${courseProgress._id}`);

            // Add the course and its progress to the user's document
            await User.findByIdAndUpdate(userId, { 
                $push: { 
                    courses: courseId,
                    courseProgress: courseProgress._id
                } 
            });

            // Send the course-specific enrollment email
            await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            );
        }
        
        return enrolledStudent; // Return the student object

    } catch (error) {
        console.error("Error in enrollStudents helper:", error);
        // Throw the error to be caught by the parent verifyPayment controller
        throw error;
    }
};