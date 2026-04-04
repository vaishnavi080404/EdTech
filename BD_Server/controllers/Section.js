const Section = require('../models/section');
const Course = require('../models/course');
const SubSection =require("../models/subSection")
const uploadImageToCloudinary  = require('../utils/imageUploader')



exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

       
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section name and course ID are required"
            });
        }

   
        const newSection = await Section.create({
            sectionName: sectionName
        });

      
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        )
        .populate({
            path: "courseContent",
            populate: { path: "subSection" } // later for nested lectures
        });

        return res.status(201).json({
            success: true,
            message: 'Section created successfully',
            updatedCourse: updatedCourseDetails
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create section',
            error: error.message
        });
    }
};





exports.updateSection = async (req,res) => {
    try {

        //data input
        const {sectionName, sectionId, courseId} = req.body;

        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

      
        return res.status(200).json({
            success:true,
            message:section,
            data:course,
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
};






exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        console.log("Subsections to delete:", section.subSection);

		
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

        console.log("Course:", course)

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};     