const CourseProgress = require("../models/courseProgress");
const SubSection = require("../models/subSection");
const Course = require('../models/course');
const User = require('../models/user');
const Certificate = require('../models/Certificate');
const puppeteer = require('puppeteer');
const { uploadPdfToCloudinary } = require('../utils/pdfUploader'); // Assuming you have this
const { certificateTemplate } = require('../mail/templates/certificateTemplate');
const { courseCompletionEmail } = require('../mail/templates/courseCompletionEmail'); // A new template
const mailSender = require('../utils/mailSender');

// BD_Server/controllers/courseProgress.js

exports.markLectureAsComplete = async (req, res) => {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        console.log(`[markLectureAsComplete] User ${userId} marking subSection ${subSectionId} of course ${courseId} as complete.`);

        const courseProgress = await CourseProgress.findOne({ courseId, userId });

        if (!courseProgress) {
            console.log(`[markLectureAsComplete] Course progress not found for user ${userId} and course ${courseId}.`);
            // This case should ideally be handled earlier, but if it happens, we can create one or return an error.
            // For now, let's assume it should exist from enrollment.
            return res.status(404).json({ success: false, message: 'Course progress not found.' });
        }
        
        if (courseProgress.completedVideos.includes(subSectionId)) {
            console.log(`[markLectureAsComplete] Lecture ${subSectionId} already marked as complete for user ${userId}.`);
            return res.status(200).json({ success: true, message: 'Lecture already marked as complete.' });
        }
        
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();
        console.log(`[markLectureAsComplete] SubSection ${subSectionId} added to completed videos for user ${userId}.`);


        // --- Stage 2: The Critical Completion Check ---
        const updatedCourseProgress = await CourseProgress.findOne({ courseId, userId });
        const course = await Course.findById(courseId).populate({ path: 'courseContent', populate: { path: 'subSection' } });
        
        let totalLectures = 0;
        course.courseContent.forEach(section => { totalLectures += section.subSection.length; });

        console.log(`[markLectureAsComplete] Current completed videos: ${updatedCourseProgress.completedVideos.length}`);
        console.log(`[markLectureAsComplete] Total lectures in course: ${totalLectures}`);

        // If the number of completed videos equals the total, proceed.
        if (updatedCourseProgress.completedVideos.length === totalLectures) {
            console.log("[markLectureAsComplete] ALL LECTURES COMPLETED! Checking for certificate generation...");
            
            // Prevent duplicate certificate generation
            const existingCertificate = await Certificate.findOne({ user: userId, course: courseId });
            
            if (existingCertificate) {
                console.log("[markLectureAsComplete] Certificate already exists for this user and course. Skipping re-generation.");
            } else {
                console.log("[markLectureAsComplete] No existing certificate found. Proceeding with certificate generation.");

                // --- Stage 3: Generate the Certificate PDF ---
                const user = await User.findById(userId);
                const completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                const htmlContent = certificateTemplate( `${user.firstName} ${user.lastName}`, course.courseName, completionDate);
                
                console.log("[markLectureAsComplete] Launching Puppeteer browser...");
                const browser = await puppeteer.launch({ 
                    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Added for better compatibility in some environments
                    headless: true // Ensure it runs in headless mode for server environments
                });
                const page = await browser.newPage();
                await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
                const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, landscape: true });
                await browser.close();
                console.log("[markLectureAsComplete] PDF buffer generated via Puppeteer.");

                // --- Stage 4: Store and Record ---
                console.log("[markLectureAsComplete] Uploading PDF to Cloudinary...");
                const cloudinaryResponse = await uploadPdfToCloudinary(
                 pdfBuffer,
                 process.env.FOLDER_NAME,
                 `Certificate_${user.firstName}_${user.lastName}_${course.courseName}`
                );
                console.log("[markLectureAsComplete] PDF uploaded to Cloudinary:", cloudinaryResponse.secure_url);
                
                await Certificate.create({
                    user: userId,
                    course: courseId,
                    certificateUrl: cloudinaryResponse.secure_url,
                });
                console.log("[markLectureAsComplete] Certificate record created in database.");

                // --- Stage 5: Notify the User ---
                console.log("[markLectureAsComplete] Sending course completion email...");
                await mailSender(
                    user.email,
                    `Congratulations! You've Completed ${course.courseName}`,
                    courseCompletionEmail( `${user.firstName} ${user.lastName}`, course.courseName, cloudinaryResponse.secure_url)
                );
                console.log("[markLectureAsComplete] Course completion email sent successfully.");
            }
        } else {
            console.log("[markLectureAsComplete] Not all lectures completed yet. Certificate not generated.");
        }
        // Always return success for marking the lecture
        return res.status(200).json({ success: true, message: 'Lecture marked as complete.' });

    } catch (error) {
        console.error("FATAL ERROR in markLectureAsComplete:", error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};



exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    try {
        // Check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({ error: "Invalid SubSection" });
        }

        // --- THIS IS THE FIX ---
        // Find the course progress document for this user and course
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            // If no progress document exists, it's the first lecture. CREATE a new one.
            courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [subSectionId], // Start by adding the current video to the completed list
            });
        } else {
            // If the document already exists, check if this video is already completed
            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error: "Subsection already completed",
                });
            }
            // If not completed, push the new subsection ID to the list
            courseProgress.completedVideos.push(subSectionId);
        }

        // Save the new or updated document to the database
        await courseProgress.save();
        // --- END OF FIX ---

        return res.status(200).json({
            success: true,
            message: "Course Progress Updated Successfully",
        });

    } catch (error) {
        console.error("UPDATE COURSE PROGRESS ERROR:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

