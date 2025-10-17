import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses, deleteCourse } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"
//import Spinner from "../../common/Spinner" // Using a consistent spinner
import { IoAddCircleOutline } from "react-icons/io5"; // A nice icon for the button

export default function MyCourses() {
   const { token } = useSelector((state) => state.auth)
   const navigate = useNavigate()
   const [courses, setCourses] = useState([])
   const [loading, setLoading] = useState(false)
   const fetchCourses = async () => {
     setLoading(true)
     const result = await fetchInstructorCourses(token)
     if (result) {
       setCourses(result)
     }
     setLoading(false)
   }
   // Fetch courses on initial component mount
   useEffect(() => {
     fetchCourses()
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   // This function now lives in the parent component that owns the 'courses' state.
   const handleCourseDelete = async (courseId) => {
     setLoading(true)
     // Call the API to delete the course from the database
     await deleteCourse({ courseId: courseId }, token)
     // After a successful delete, re-fetch the updated list of courses to refresh the UI
     const result = await fetchInstructorCourses(token)
     if (result) {
       setCourses(result)
     }
     setLoading(false)
   }
  return (
    // --- STYLED MAIN CONTAINER ---
    <div className="text-espresso-brown mt-10">
      
      {/* Page Header */}
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <IoAddCircleOutline size={20} />
        </IconBtn>
      </div>

      {/* Conditional Rendering for Loading State and Courses Table */}
      {loading ? (
        // Using a centered spinner for a professional loading state
        <div className="grid min-h-[calc(100vh-10rem)] place-items-center">
         Loading
        </div>
      ) : (
        // The table component will inherit the text color and font from the main container
        <CoursesTable courses={courses} handleDelete={handleCourseDelete} />
      )}
    </div>
  )
}

// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { fetchInstructorCourses, deleteCourse } from "../../../services/operations/courseDetailsAPI"
// import IconBtn from "../../common/IconBtn"
// import CoursesTable from "./InstructorCourses/CoursesTable" // Your table component

// export default function MyCourses() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(false)

//   const fetchCourses = async () => {
//     setLoading(true)
//     const result = await fetchInstructorCourses(token)
//     if (result) {
//       setCourses(result)
//     }
//     setLoading(false)
//   }

//   // Fetch courses on initial component mount
//   useEffect(() => {
//     fetchCourses()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // This function now lives in the parent component that owns the 'courses' state.
//   const handleCourseDelete = async (courseId) => {
//     setLoading(true)
//     // Call the API to delete the course from the database
//     await deleteCourse({ courseId: courseId }, token)
//     // After a successful delete, re-fetch the updated list of courses to refresh the UI
//     const result = await fetchInstructorCourses(token)
//     if (result) {
//       setCourses(result)
//     }
//     setLoading(false)
//   }

//   return (
//     <div>
//       <div className="mb-14 flex items-center justify-between">
//         <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
//         <IconBtn
//           text="Add Course"
//           onClick={() => navigate("/dashboard/add-course")}
//         />
//       </div>
//       {/* Show a spinner while fetching courses */}
//       {loading ? (
//         <div className="spinner"></div>
//       ) : (
//         // Pass the courses list and the delete handler down to the table component
//         <CoursesTable courses={courses} handleDelete={handleCourseDelete} />
//       )}
//     </div>
//   )
// }