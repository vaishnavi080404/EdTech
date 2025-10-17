const express = require('express');
const router =express.Router();

const {auth, isInstructor,isStudent}= require('../middleware/auth');

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard,
     getPurchaseHistory,
    getStudentAnalytics,
    updateUserActivity,
      getAllUserCertificates,

}= require('../controllers/Profile');

// delete account
router.delete('/deleteProfile', auth, deleteAccount);

// update profile
router.put('/updateProfile', auth, updateProfile);

// get all user details
router.get('/getAllUserDetails', auth, getAllUserDetails);
//get enrolled courses
router.get('/getEnrolledCourses', auth, getEnrolledCourses);

// update display picture
router.put('/updateDisplayPicture', auth, updateDisplayPicture);

router.get("/instructorDashboard", auth, isInstructor,   instructorDashboard);

router.get("/getPurchaseHistory", auth, getPurchaseHistory);

router.get("/getStudentAnalytics", auth, isStudent, getStudentAnalytics);

router.post('/update-activity', auth, isStudent, updateUserActivity);

// Route to get all certificates for a user
router.get("/getUserCertificates", auth, getAllUserCertificates); // Protected route



module.exports = router;