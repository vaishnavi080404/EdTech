import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourses/VideoSidebar';
import CourseReviewModal from '../components/core/ViewCourses/CourseReviewModal';

const ViewCourse = () => {
    
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            setLoading(true); 
            const courseData = await getFullDetailsOfCourse(courseId, token);
            
           
            if (courseData?.courseDetails) {
                dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
                dispatch(setEntireCourseData(courseData.courseDetails));
                dispatch(setCompletedLectures(courseData.completedVideos));
            }
           

            setLoading(false); 
        };
        
        if (courseId && token) {
            setCourseSpecificDetails();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId, token]);

   
    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }

return (
        <>
           
            <div className="relative flex min-h-screen bg-warm-stone top-9">
                
         
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                
               <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto lg:ml-[320px]">
                    <div className="mx-auto max-w-6xl p-4 lg:p-6">
                        <Outlet />
                    </div>
                </div>

            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    );
};

export default ViewCourse;

