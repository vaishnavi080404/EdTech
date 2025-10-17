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
    const [loading, setLoading] = useState(false); // Add a loading state

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            setLoading(true); // Start loading
            const courseData = await getFullDetailsOfCourse(courseId, token);
            
            // --- THIS IS THE FIX ---
            // Check if the API call was successful and data exists before dispatching
            if (courseData?.courseDetails) {
                dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
                dispatch(setEntireCourseData(courseData.courseDetails));
                dispatch(setCompletedLectures(courseData.completedVideos));
            }
            // --- END OF FIX ---

            setLoading(false); // Stop loading
        };
        
        if (courseId && token) {
            setCourseSpecificDetails();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId, token]);

    // Show a spinner while the course data is being fetched
    if (loading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }

return (
        <>
            {/* --- STYLED MAIN CONTAINER --- */}
            {/* Using the primary dark color for a focused "cinema" feel */}
            <div className="relative flex min-h-screen bg-warm-stone top-9">
                
                {/* The Course Sidebar (styled internally) */}
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                {/* The Main Content Area (where the video player will appear) */}
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

//     return (
//         <>
//             <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//                 {/* The Course Sidebar */}
//                 <VideoDetailsSidebar setReviewModal={setReviewModal} />

//                 {/* The Main Content Area Where the Video will be Displayed */}
//                 <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//                     <div className="mx-6">
//                         {/* The <Outlet> is the placeholder where the VideoDetails component will be rendered */}
//                         <Outlet />
//                     </div>
//                 </div>
//             </div>
//             {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
//         </>
//     );
// };

// export default ViewCourse;
