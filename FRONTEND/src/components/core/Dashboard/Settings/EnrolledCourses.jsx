
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserEnrolledCourses } from '../../../../services/operations/profileAPI';
import Spinner from "../../../common/Spinner";


export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
     const fetchEnrolledCourses = async () => {
      setLoading(true);
       try {
         const res = await getUserEnrolledCourses(token);
         setEnrolledCourses(res);
       } catch (error) {
         console.log("Could not fetch enrolled courses.");
       }
       setLoading(false);
     };
  
     fetchEnrolledCourses();
   // 3. Add 'location.pathname' as a dependency.
   // This tells React to re-run this effect whenever the URL path changes.
   }, [location.pathname, token]); 
  return (
    <>
      <div className="text-3xl font-bold text-soft-terracotta mt-10">Enrolled Courses</div>
 {loading ? (
        <div className="grid min-h-[calc(100vh-10rem)] place-items-center">
          <Spinner />
        </div>
      ) : !enrolledCourses || !enrolledCourses.length ? (
        <div className="grid h-[50vh] w-full place-content-center bg-warm-stone/10 rounded-lg mt-8">
          <p className="text-2xl font-semibold text-soft-terracotta/70">
            You have not enrolled in any course yet.
          </p>
          {/* Optional: Add a button to browse the catalog */}
        </div>
      ) : (
        <div className="my-8 text-espresso-brown">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-warm-stone/20">
            <p className="w-[45%] px-5 py-3 font-semibold text-soft-terracotta/70">Course Name</p>
            <p className="flex-1 px-2 py-3 font-semibold text-soft-terracotta/70">Progress</p>
          </div>
          {/* Course Rows */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`
                flex items-center border border-t-0 border-warm-stone/20 
                transition-all duration-200 hover:bg-warm-stone/10
                ${i === arr.length - 1 ? "rounded-b-lg" : ""}
              `}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-24 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-1">
                  <p className="font-semibold text-soft-terracotta/80">{course.courseName}</p>
                  <p className="text-xs text-espresso-brown/70">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              
              <div className="w-[55%] flex flex-col gap-2 px-2 py-3">
                <p className="text-sm text-warm-stone">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  bgColor="blue" // Burnt Sienna
                  baseBgColor="#F8E8E6" // Muted Terracotta
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import ProgressBar from "@ramonak/react-progress-bar";
// import { useLocation, useNavigate } from 'react-router-dom'; // 1. Import useLocation
// import { getUserEnrolledCourses } from '../../../../services/operations/profileAPI';

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation(); // 2. Get the location object

//   const [enrolledCourses, setEnrolledCourses] = useState(null);

//   // --- THIS IS THE FIX ---
//   // We've replaced the getEnrolledCourses function with a more robust useEffect.
//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       try {
//         const res = await getUserEnrolledCourses(token);
//         setEnrolledCourses(res);
//       } catch (error) {
//         console.log("Could not fetch enrolled courses.");
//       }
//     };
    
//     fetchEnrolledCourses();
//   // 3. Add 'location.pathname' as a dependency.
//   // This tells React to re-run this effect whenever the URL path changes.
//   }, [location.pathname, token]); 
//   // --- END OF FIX ---

//   console.log(enrolledCourses);

//   return (
//     <>
//       <div className="text-3xl text-richblack-50">Enrolled Courses</div>
//       {!enrolledCourses ? (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//           <div className="spinner"></div>
//         </div>
//       ) : !enrolledCourses.length ? (
//         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
//           You have not enrolled in any course yet.
//         </p>
//       ) : (
//         <div className="my-8 text-richblack-5">
//           {/* Headings */}
//           <div className="flex rounded-t-lg bg-richblack-500 ">
//             <p className="w-[45%] px-5 py-3">Course Name</p>
//             {/* <p className="w-1/4 px-2 py-3">Duration</p> */}
//             <p className="flex-1 px-2 py-3">Progress</p>
//           </div>
//           {/* Course Rows */}
//           {enrolledCourses.map((course, i, arr) => (
//             <div
//               className={`flex items-center border border-richblack-700 ${
//                 i === arr.length - 1 ? "rounded-b-lg" : ""
//               }`}
//               key={i}
//             >
//               <div
//                 className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                 onClick={() => {
//                   navigate(
//                     `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
//                   );
//                 }}
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt="course_img"
//                   className="h-14 w-24 rounded-lg object-cover"
//                 />
//                 <div className="flex max-w-xs flex-col gap-2">
//                   <p className="font-semibold">{course.courseName}</p>
//                   <p className="text-xs text-richblack-300">
//                     {course.courseDescription.length > 50
//                       ? `${course.courseDescription.slice(0, 50)}...`
//                       : course.courseDescription}
//                   </p>
//                 </div>
//               </div>
//               {/* <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div> */}
//               <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
//                 <p>Progress: {course.progressPercentage || 0}%</p>
//                 <ProgressBar
//                   completed={course.progressPercentage || 0}
//                   height="8px"
//                   isLabelVisible={false}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
