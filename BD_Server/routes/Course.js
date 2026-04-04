const express = require('express');
const router =express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    editCourse,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse,

}= require('../controllers/Course');


//category controller import
const{showAllCategories,
    createCategory,
    categoryPageDetails
    
} = require('../controllers/Category');

//section controller import

const{
    createSection,
    updateSection,
    deleteSection,

}=require('../controllers/Section');

//subsection controller import

const{
    createSubsection,
    updateSubSection,
    deleteSubsection,

}=require('../controllers/SubSection');


//rating controller import

const{
    createRatingAndReview ,
    getAvgRating,
    getAllRatings
  
}=require('../controllers/RatingandReview');

// const {
//     updateCourseProgress,
//     markLectureAsComplete 
// } = require("../controllers/courseProgress")


//importing middleware
const {auth, isInstructor,isStudent,isAdmin}=require('../middleware/auth');

// Course route

router.post('/createCourse',auth,isInstructor,createCourse);
//add sections to a course
router.post('/addSection',auth,isInstructor,createSection);
//update a section
router.put('/updateSection',auth,isInstructor,updateSection);
//delete a section
router.post('/deleteSection',auth,isInstructor,deleteSection);
//edit a subsection
router.put('/updateSubsection',auth,isInstructor,updateSubSection);
//delete a subsection
router.post('/deleteSubsection',auth,isInstructor,deleteSubsection);
//add a subsection to a section
router.post('/addSubsection',auth,isInstructor,createSubsection);
//get all registered courses
router.get('/getAllCourses',getAllCourses);
//get course details for a particular course
router.get('/getCourseDetails',getCourseDetails);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

router.post("/getFullCourseDetails", auth, getFullCourseDetails)

// get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// delete a Course
router.delete("/deleteCourse", deleteCourse)
// //courseProgress
// router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)
// router.post("/markLectureAsComplete", auth, isStudent, markLectureAsComplete);

// category routes
router.get('/showAllCategories',showAllCategories);
router.post('/createCategory',auth,isAdmin, createCategory);
router.post('/getCategoryPageDetails',categoryPageDetails);

// rating and Review routes
router.post('/createRating',auth,isStudent,createRatingAndReview );
router.get('/getAvgRating',getAvgRating);
router.get('/getReviews',getAllRatings);



module.exports = router;
