// import { useDispatch } from "react-redux"
// import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
// import { useState } from "react"
// import { FaCheck } from "react-icons/fa"
// import { FiEdit2 } from "react-icons/fi"
// import { HiClock } from "react-icons/hi"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { useNavigate } from "react-router-dom"
// import { formatDate } from "../../../../services/formatDate"
// import { COURSE_STATUS } from "../../../../utils/constants"
// import ConfirmationModal from "../../../common/ConfirmationModal"
// import { setCourse, setEditCourse } from "../../../../slices/courseSlice"

// // --- FIX: The component now receives 'handleDelete' as a prop ---
// export default function CoursesTable({ courses, handleDelete }) {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [confirmationModal, setConfirmationModal] = useState(null)
//   const TRUNCATE_LENGTH = 30

//   return (
//     <>
//       <Table className="rounded-xl border border-richblack-800 ">
//         <Thead>
//           <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
//             <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
//               Courses
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Price
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Actions
//             </Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {courses?.length === 0 ? (
//             <Tr>
//               <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
//                 No courses found
//               </Td>
//             </Tr>
//           ) : (
//             courses?.map((course) => (
//               <Tr
//                 key={course._id}
//                 className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
//               >
//                 <Td className="flex flex-1 gap-x-4">
//                   <img
//                     src={course?.thumbnail}
//                     alt={course?.courseName}
//                     className="h-[144px] w-[260px] rounded-lg object-cover"
//                   />
//                   <div className="flex flex-col justify-between">
//                     <p className="text-lg font-semibold text-richblack-5">
//                       {course.courseName}
//                     </p>
//                     <p className="text-xs text-richblack-300">
//                       {course.courseDescription.length > 50
//                         ? `${course.courseDescription.slice(0, 50)}...`
//                         : course.courseDescription}
//                     </p>
//                     <p className="text-[12px] text-white">
//                       Created: {formatDate(course.createdAt)}
//                     </p>
//                     {course.status === COURSE_STATUS.DRAFT ? (
//                       <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
//                         <HiClock size={14} />
//                         Drafted
//                       </p>
//                     ) : (
//                       <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
//                         <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
//                           <FaCheck size={8} />
//                         </div>
//                         Published
//                       </div>
//                     )}
//                   </div>
//                 </Td>
//                 <Td className="text-sm font-medium text-richblack-100">
//                   ₹{course.price}
//                 </Td>
//                 <Td className="text-sm font-medium text-richblack-100 ">
//                   <button
//                     disabled={loading}
//                     onClick={() => {
//                       navigate(`/dashboard/edit-course/${course._id}`)
//                     }}
//                     title="Edit"
//                     className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
//                   >
//                     <FiEdit2 size={20} />
//                   </button>
//                   <button
//                     disabled={loading}
//                     onClick={() => {
//                       setConfirmationModal({
//                         text1: "Do you want to delete this course?",
//                         text2: "All the data related to this course will be deleted",
//                         btn1Text: "Delete",
//                         btn2Text: "Cancel",
//                         // --- FIX: Call the 'handleDelete' function from props ---
//                         btn1Handler: () => {
//                           handleDelete(course._id)
//                           setConfirmationModal(null)
//                         },
//                         btn2Handler: () => setConfirmationModal(null),
//                       })
//                     }}
//                     title="Delete"
//                     className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
//                   >
//                     <RiDeleteBin6Line size={20} />
//                   </button>
//                 </Td>
//               </Tr>
//             ))
//           )}
//         </Tbody>
//       </Table>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }



import { useDispatch } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../../services/formatDate"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, handleDelete }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

return (
  <>
    {/* --- STYLED TABLE CONTAINER --- */}
    <Table className="w-full overflow-hidden rounded-lg border border-warm-stone/20 bg-soft-terracotta/40 shadow-lg">
      <Thead>
        {/* Table Header Row */}
        <Tr className="grid grid-cols-12 items-center rounded-t-lg border-b border-warm-stone/20 bg-warm-stone/10 px-6 py-3">
          <Th className="col-span-7 text-left text-sm font-semibold uppercase tracking-wide text-espresso-brown">
            Courses
          </Th>
          <Th className="col-span-2 text-left text-sm font-semibold uppercase tracking-wide text-espresso-brown">
            Price
          </Th>
          <Th className="col-span-3 text-left text-sm font-semibold uppercase tracking-wide text-espresso-brown">
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {courses?.length === 0 ? (
          <Tr>
            <Td
              colSpan={3}
              className="py-14 text-center text-lg font-medium text-espresso-brown/70"
            >
              No courses found.
            </Td>
          </Tr>
        ) : (
          courses?.map((course) => (
            <Tr
              key={course._id}
              className="grid grid-cols-12 gap-x-6 border-b border-warm-stone/20 px-6 py-6 transition-colors hover:bg-warm-stone/5"
            >
              {/* Course Details Cell */}
              <Td className="col-span-7 flex gap-x-4">
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  className="h-[120px] w-[200px] rounded-md object-cover shadow-sm"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold text-soft-terracotta">
                    {course.courseName}
                  </p>
                  <p className="mt-1 text-sm text-espresso-brown/80">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                  <p className="mt-1 text-xs text-espresso-brown/70">
                    Created: {formatDate(course.createdAt)}
                  </p>

                  {/* Status Badge */}
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-rose-gold/20 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-rose-gold/40">
                      <HiClock size={14} />
                      Draft
                    </span>
                  ) : (
                    <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-rich-teal/20 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-rich-teal/40">
                      <FaCheck size={12} />
                      Published
                    </span>
                  )}
                </div>
              </Td>

              {/* Price Cell */}
              <Td className="col-span-2 flex items-center text-sm font-semibold text-rose-500">
                ₹{course.price}
              </Td>

              {/* Actions Cell */}
              <Td className="col-span-3 flex items-center">
                <div className="flex gap-x-4">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    title="Edit"
                    className="rounded-md p-2 transition-all duration-200 hover:scale-110 hover:bg-warm-stone/20 hover:text-blue-900"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => {
                          handleDelete(course._id)
                          setConfirmationModal(null)
                        },
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }}
                    title="Delete"
                    className="rounded-md p-2 transition-all duration-200 hover:scale-110 hover:bg-rose-gold/20 hover:text-red-900"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>

    {/* Confirmation Modal */}
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </>
)
}