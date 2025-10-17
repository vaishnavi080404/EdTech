// In BD_Server/routes/courseProgress.js

const express = require("express");
const router = express.Router();

// Import the controller and middleware
const { markLectureAsComplete, updateCourseProgress } = require("../controllers/courseProgress");
const { auth, isStudent } = require("../middleware/auth");

// Define the routes
router.post("/markLectureAsComplete", auth, isStudent, markLectureAsComplete);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;