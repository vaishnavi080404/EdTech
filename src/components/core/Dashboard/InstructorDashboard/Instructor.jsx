
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getInstructorData } from '../../../../services/operations/profileAPI'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'
import { FaBook, FaUsers, FaRupeeSign } from "react-icons/fa";
//import Spinner from "../../../common/Spinner" // Using a consistent spinner

export default function Instructor() {
   const { token } = useSelector((state) => state?.auth)
     const { user } = useSelector((state) => state.profile)
     const [loading, setLoading] = useState(false)
     const [instructorData, setInstructorData] = useState(null)
     const [courses, setCourses] = useState([])

 // This is the corrected useEffect in Instructor.jsx
 useEffect(() => {
   const getCourseDataWithStats = async () => {
     setLoading(true);
  
     const instructorApiData = await getInstructorData(token);
     const result = await fetchInstructorCourses(token);
  
     console.log("Instructor Stats Data:", instructorApiData);
     console.log("Instructor Courses Data:", result);
     // --- THIS IS THE FIX ---
     // Always set the instructor data, even if it's an empty array.
     // The component's logic will handle the empty state correctly.
     if (instructorApiData) {
       setInstructorData(instructorApiData);
     }
     // --- END OF FIX ---
     if (result) {
       setCourses(result);
     }
  
     setLoading(false);
   };

   getCourseDataWithStats();
 }, []); // The dependency array is empty, which is correct for a fetch-on-mount.

    
  

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr?.totalAmountGenerated, 0)
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr?.totalStudentsEnrolled, 0)

return (
    <div className="text-espresso-brown p-6">
      
      {/* --- ENGAGING WELCOME HEADER --- */}
      <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-rose-gold to-burnt-sienna  text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-soft-terracotta/90 mt-1">
          Here's a look at your dashboard.
        </p>
      </div>

      {loading ? (
        <div className="grid min-h-[calc(100vh-12rem)] place-items-center">
          Loading...
        </div>
      ) : courses?.length > 0 ? (
        <div className="space-y-8">
          {/* --- Animated Chart and Stats Section --- */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Chart */}
            <div className="flex-1 rounded-lg bg-warm-stone/50 backdrop-blur-md p-6 border border-warm-stone/20 shadow-xl opacity-0 animate-fadeInUp" style={{animationDelay: '100ms'}}>
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-xl font-bold text-soft-terracotta">Visualize</p>
                  <p className="mt-4 text-center text-soft-terracotta">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
            </div>
            
            {/* Total Statistics Card */}
            <div className="flex min-w-[280px] flex-col rounded-lg bg-warm-stone/10 p-6 border border-warm-stone/20 shadow-md opacity-0 animate-fadeInUp" style={{animationDelay: '300ms'}}>
              <p className="text-xl font-bold text-soft-terracotta">Statistics</p>
              <div className="mt-4 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-rose-gold/20 rounded-full"><FaBook className="text-rose-300 text-2xl" /></div>
                  <div>
                    <p className="text-base text-soft-terracotta">Total Courses</p>
                    <p className="text-3xl font-semibold text-rose-200">{courses?.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-burnt-sienna/20 rounded-full"><FaUsers className="text-orange-300 text-2xl" /></div>
                  <div>
                    <p className="text-base text-soft-terracotta">Total Students</p>
                    <p className="text-3xl font-semibold text-orange-200">{totalStudents}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-rich-teal/20 rounded-full"><FaRupeeSign className="text-green-300 text-2xl" /></div>
                  <div>
                    <p className="text-base text-soft-terracotta">Total Income</p>
                    <p className="text-3xl font-semibold text-green-200">₹ {totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Courses Section */}
          <div className="rounded-lg p-6 border border-soft-terracotta/50 shadow-md opacity-0 animate-fadeInUp" style={{animationDelay: '500ms'}}>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-soft-terracotta">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-soft-terracotta/60 hover:underline">View All</p>
              </Link>
            </div>
            <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="group">
                  <div className="overflow-hidden rounded-md ">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105 "
                    />
                  </div>
                  <div className="mt-3 w-full">
                    <p className="text-sm font-semibold text-soft-terracotta">{course?.courseName}</p>
                    <div className="mt-1 flex items-center space-x-2 text-xs font-medium text-soft-terracotta">
                      <p>{course?.studentsEnrolled?.length || 0} students</p>
                      <p>|</p>
                      <p>₹ {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="mt-20 rounded-md bg-warm-stone/10 p-6 py-20 text-center border border-warm-stone/20 opacity-0 animate-fadeInUp">
          <p className="text-2xl font-bold text-soft-terracotta">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-2 text-lg font-semibold text-soft-terracotta hover:underline">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}


// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { getInstructorData } from '../../../../services/operations/profileAPI'
// import { Link } from 'react-router-dom'
// import InstructorChart from './InstructorChart'
// import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'



// export default function Instructor() {
//     const { token } = useSelector((state) => state?.auth)
//     const { user } = useSelector((state) => state.profile)
//     const [loading, setLoading] = useState(false)
//     const [instructorData, setInstructorData] = useState(null)
//     const [courses, setCourses] = useState([])
  
// // This is the corrected useEffect in Instructor.jsx

// useEffect(() => {
//   const getCourseDataWithStats = async () => {
//     setLoading(true);
    
//     const instructorApiData = await getInstructorData(token);
//     const result = await fetchInstructorCourses(token);
    
//     console.log("Instructor Stats Data:", instructorApiData);
//     console.log("Instructor Courses Data:", result);

//     // --- THIS IS THE FIX ---
//     // Always set the instructor data, even if it's an empty array.
//     // The component's logic will handle the empty state correctly.
//     if (instructorApiData) {
//       setInstructorData(instructorApiData);
//     }
//     // --- END OF FIX ---

//     if (result) {
//       setCourses(result);
//     }
    
//     setLoading(false);
//   };
  
//   getCourseDataWithStats();
// }, []); // The dependency array is empty, which is correct for a fetch-on-mount.
  
//     const totalAmount = instructorData?.reduce(
//       (acc, curr) => acc + curr?.totalAmountGenerated,
//       0
//     )
  
//     const totalStudents = instructorData?.reduce(
//       (acc, curr) => acc + curr?.totalStudentsEnrolled,
//       0
//     )
  
//     return (
//       <div>
//         <div className="space-y-2">
//           <h1 className="text-2xl font-bold text-richblack-5">
//             Hi {user?.firstName} 👋
//           </h1>
//           <p className="font-medium text-richblack-200">
//             Let's start something new
//           </p>
//         </div>
//         {loading ? (
//           <div className="spinner"></div>
//         ) : courses?.length > 0 ? (
//           <div>
//             <div className="my-4 flex h-[450px] space-x-4">
//               {/* Render chart / graph */}
//               {totalAmount > 0 || totalStudents > 0 ? (
//                 <InstructorChart courses={instructorData} />
//               ) : (
//                 <div className="flex-1 rounded-md bg-richblack-800 p-6">
//                   <p className="text-lg font-bold text-richblack-5">Visualize</p>
//                   <p className="mt-4 text-xl font-medium text-richblack-50">
//                     Not Enough Data To Visualize
//                   </p>
//                 </div>
//               )}
//               {/* Total Statistics */}
//               <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
//                 <p className="text-lg font-bold text-richblack-5">Statistics</p>
//                 <div className="mt-4 space-y-4">
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Courses</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       {courses?.length}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Students</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       {totalStudents}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-lg text-richblack-200">Total Income</p>
//                     <p className="text-3xl font-semibold text-richblack-50">
//                       Rs. {totalAmount}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="rounded-md bg-richblack-800 p-6">
//               {/* Render 3 courses */}
//               <div className="flex items-center justify-between">
//                 <p className="text-lg font-bold text-richblack-5">Your Courses</p>
//                 <Link to="/dashboard/my-courses">
//                   <p className="text-xs font-semibold text-yellow-50">View All</p>
//                 </Link>
//               </div>
//               <div className="my-4 flex items-start space-x-6">
//                 {courses.slice(0, 3).map((course) => (
//                   <div key={course._id} className="w-1/3">
//                     <img
//                       src={course?.thumbnail}
//                       alt={course?.courseName}
//                       className="h-180px] w-full rounded-md object-cover"
//                     />
//                     <div className="mt-3 w-full">
//                       <p className="text-sm font-medium text-richblack-50">
//                         {course?.courseName}
//                       </p>
//                       <div className="mt-1 flex items-center space-x-2">
//                         <p className="text-xs font-medium text-richblack-300">
//                           {course?.studentsEnroled?.length} students
//                         </p>
//                         <p className="text-xs font-medium text-richblack-300">
//                           |
//                         </p>
//                         <p className="text-xs font-medium text-richblack-300">
//                           Rs. {course.price}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
//             <p className="text-center text-2xl font-bold text-richblack-5">
//               You have not created any courses yet
//             </p>
//             <Link to="/dashboard/add-course">
//               <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
//                 Create a course
//               </p>
//             </Link>
//           </div>
//         )}
//       </div>
//     )
//   }

