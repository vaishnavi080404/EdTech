const RatingAndReview = require('../models/ratingAndReview');
const Course = require('../models/course');
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
// createRating
exports.createRatingAndReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        // Check if user is enrolled in the course
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
        });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in this course.",
            });
        }

        // Check if user has already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "You have already reviewed this course.",
            });
        }

        // Create the new rating and review
        const newRatingAndReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });

        // Add the review to the course document
        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    ratingAndReviews: newRatingAndReview._id,
                },
            },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Rating and review created successfully.",
            data: newRatingAndReview,
        });

    } catch (error) {
        // This will print the EXACT error to your terminal
        console.error("CREATE RATING ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review.",
            error: error.message,
        });
    }
};


//get avg rating of a course

exports.getAvgRating = async (req, res) => {
    try{
        const {courseId} = req.body;
        //calculate average rating
        const result = await RatingAndReview.aggregate([{
            $match: {
                course:new mongoose.Types.ObjectId(courseId) // convert string to ObjectId
            }

        },
        {
            $group: {
                _id: null,
                avgRating: {
                    $avg: '$rating'
                }
            }
        }

        ])
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                message: 'Average rating fetched successfully',
                avgRating: result[0].avgRating
            });
        }

        //if no reviews exist
        return res.status(404).json({
            success: false,
            message: 'No reviews found for the course',
             avgRating:0,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Failed to fetch average rating'
        });

    }
}
//get all ratings and reviews of a course

exports.getAllRatings = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image", // Select only the fields you need
            })
            .populate({
                path: "course",
                select: "courseName", // Select only the course name
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });

    } catch (error) {
        console.error("GET ALL RATINGS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all ratings and reviews",
            error: error.message,
        });
    }
};