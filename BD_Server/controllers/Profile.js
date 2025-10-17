const Profile = require('../models/Profile');
const User = require('../models/user');
const CourseProgress = require("../models/courseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Course = require('../models/course')
const Order = require('../models/order');
const Certificate = require('../models/Certificate');


exports.updateProfile = async (req, res) => {
   
  try {
    // Extract profile data from request body
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    

    // Get user ID from decoded token (set by auth middleware)
    const userId = req.user.id;

    // Validate required fields
    if (!contactNumber || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields (contactNumber and gender)',
      });
    }

    // Find user and their profile
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const profileId = userDetails.additionalDetails;

    // Update profile document
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        dateOfBirth,
        about,
        contactNumber,
        gender,
      },
      { new: true } // Return the updated document
    );

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: updatedProfile,
    });

  } catch (error) {
    console.error('Error while updating profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while updating profile',
      error: error.message,
    });
  }
};

//delete account

exports.deleteAccount = async (req, res) => {
	try {
		
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
    try{
        // find user by id
        const id = req.user.id;
        // validate the data
        const userDetails = await User.findById(id).populate('additionalDetails').exec();//populate the profile details
        // if(!userDetails){
        //     return res.status(404).json({
        //         success: false,
        //         message: 'User not found'
        //     });
        // }
        
        // return user details
        res.status(200).json({
            success: true,
            userDetails
        });


    }catch(error){
        // return error response
        res.status(500).json({
            success: false,
            message: 'Something went wrong while getting user details'
        });

    }

}

//get all enrolled courses
// This is the fully corrected and debug-ready controller

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // We only need the 'courses' field from the user
    const userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .lean() // Use .lean() for faster, plain JavaScript objects
      .exec();

    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // --- MAIN LOGIC REVISION ---
    // Use Promise.all for more efficient database calls
    const coursesWithProgress = await Promise.all(
      userDetails.courses.map(async (course) => {
        let totalDurationInSeconds = 0;
        let subsectionLength = 0;

        course.courseContent.forEach((section) => {
          if (section.subSection) {
            subsectionLength += section.subSection.length;
            section.subSection.forEach((subSec) => {
              totalDurationInSeconds += parseInt(subSec.timeDuration || 0, 10);
            });
          }
        });

        course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        // --- DEBUGGING LOGS ---
        console.log(`🔍 Searching for progress for course: ${course._id} and user: ${userId}`);
        const courseProgress = await CourseProgress.findOne({
          courseId: course._id,
          userId: userId,
        });
        
        if(courseProgress) {
            console.log(`✅ Found progress for course ${course._id}:`, courseProgress.completedVideos);
        } else {
            console.log(`❌ No progress found for course ${course._id}.`);
        }
        // --- END DEBUGGING ---

        const completedVideosCount = courseProgress?.completedVideos?.length || 0;

        const progressPercentage =
          subsectionLength === 0
            ? 0
            : Math.round((completedVideosCount / subsectionLength) * 100);

        // Return a new object with the added properties
        return {
          ...course,
          progressPercentage: progressPercentage,
        };
      })
    );
    
    return res.status(200).json({
      success: true,
      data: coursesWithProgress,
    });

  } catch (error) {
    console.error("❌ Error in getEnrolledCourses:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};


//update display picture

// Valid image types
const supportedTypes = ["jpg", "jpeg", "png"];

exports.updateDisplayPicture = async (req, res) => {
  //  console.log("🔵 updateDisplayPicture route hit");
  // console.log("REQ HEADERS: ", req.headers);
  
  try {
   
    const userId = req.user.id;

    // Check if image file is provided
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const imageFile = req.files.image;

    // Validate file type
    const fileType = imageFile.name.split(".").pop().toLowerCase();
    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported. Only jpg, jpeg, png allowed",
      });
    }

    // Upload to Cloudinary
    const result = await uploadImageToCloudinary(imageFile, "Vaish", 80);

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: result.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      imageUrl: result.secure_url,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating display picture:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile picture",
      error: error.message,
    });
  }
};

// In /controllers/Profile.js

exports.instructorDashboard = async (req, res) => {
    try {
        // --- THIS IS THE DEBUGGING STEP ---
        // We have moved the 'isInstructor' logic directly into the controller.
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructors only.",
            });
        }
        // --- END OF DEBUGGING STEP ---

        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            };
            return courseDataWithStats;
        });

        return res.status(200).json({
            success: true,
            data: courseData,
        });

    } catch (error) {
        console.error("INSTRUCTOR DASHBOARD API ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

exports.getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 }) // Show most recent first
            .populate({
                path: 'courses',
                populate: {
                    path: 'instructor',
                    model: 'user',
                    select: 'firstName lastName'
                }
            })
            .exec();

        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error("Error fetching purchase history:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve purchase history.",
        });
    }
};


// controllers/analyticsController.js

exports.updateUserActivity = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { lastSeen: new Date() });
        return res.status(200).json({ success: true, message: "Activity updated." });
    } catch (error) {
        console.error("Failed to update user activity:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};

// --- GET STUDENT ANALYTICS ---
// The final, robust version that handles all edge cases.
exports.getStudentAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        // --- Active Users Metric ---
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const activeUsersToday = await User.countDocuments({
            accountType: 'Student',
            lastSeen: { $gte: twentyFourHoursAgo },
        });

        // --- Score and Rank Metric ---
        const allUsers = await User.find({ accountType: 'Student' }).populate('courseProgress').exec();

        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({ success: false, message: "No student data available." });
        }
        
        if (allUsers.length === 1) {
            const completedLectures = Array.isArray(allUsers[0].courseProgress) ? allUsers[0].courseProgress.length : 0;
            const totalCourses = Array.isArray(allUsers[0].courses) ? allUsers[0].courses.length : 0;
            const score = totalCourses > 0 ? Math.round((completedLectures / totalCourses) * 100) : 0;
            return res.status(200).json({
                success: true,
                data: {
                    currentUser: { rank: 1, score, percentile: 100 },
                    peerAverage: { score },
                    leaderboard: [{ userId: allUsers[0]._id, name: `${allUsers[0].firstName} ${allUsers[0].lastName}`, image: allUsers[0].image, score }],
                    activeUsersToday: 1,
                },
            });
        }
        
        const studentScores = allUsers.map(user => {
            const totalCourses = Array.isArray(user.courses) ? user.courses.length : 0;
            const completedLectures = Array.isArray(user.courseProgress) ? user.courseProgress.length : 0;
            const score = totalCourses > 0 ? Math.round((completedLectures / totalCourses) * 100) : 0;
            return { userId: user._id, name: `${user.firstName} ${user.lastName}`, image: user.image, score };
        });

        studentScores.sort((a, b) => b.score - a.score);
        
        const currentUserData = studentScores.find(student => student.userId.toString() === userId);
        if (!currentUserData) {
            return res.status(404).json({ success: false, message: "Current user data not found." });
        }
        const currentUserRank = studentScores.findIndex(student => student.userId.toString() === userId) + 1;
        
        const totalScoreSum = studentScores.reduce((acc, curr) => acc + curr.score, 0);
        const peerAverageScore = Math.round(totalScoreSum / studentScores.length);
        const percentile = Math.round(((studentScores.length - currentUserRank) / (studentScores.length - 1)) * 100);

        const analyticsData = {
            currentUser: { rank: currentUserRank, score: currentUserData.score, percentile },
            peerAverage: { score: peerAverageScore },
            leaderboard: studentScores.slice(0, 10),
            activeUsersToday: activeUsersToday,
        };

        return res.status(200).json({
            success: true,
            data: analyticsData,
        });

    } catch (error) {
        console.error("Error fetching student analytics:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch student analytics.",
        });
    }
};




exports.getAllUserCertificates = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated request

        console.log(`[getAllUserCertificates] Fetching certificates for user ID: ${userId}`);

        // Find all certificates belonging to this user
        // Populate the 'course' field to get course name for display
        const certificates = await Certificate.find({ user: userId })
                                                .populate('course', 'courseName thumbnail') // Only fetch courseName and thumbnail
                                                .exec();

        if (!certificates || certificates.length === 0) {
            console.log(`[getAllUserCertificates] No certificates found for user ${userId}.`);
            return res.status(200).json({
                success: true,
                message: "No certificates found for this user.",
                certificates: []
            });
        }

        console.log(`[getAllUserCertificates] Found ${certificates.length} certificates for user ${userId}.`);
        return res.status(200).json({
            success: true,
            certificates: certificates,
        });

    } catch (error) {
        console.error("FATAL ERROR in getAllUserCertificates:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user certificates",
            error: error.message,
        });
    }
};