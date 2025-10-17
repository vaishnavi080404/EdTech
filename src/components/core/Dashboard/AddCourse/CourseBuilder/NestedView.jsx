import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"


export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection(
      { subSectionId, sectionId, courseId: course._id },
      token
    )

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
    }
    setConfirmationModal(null)
  }

  return (
    <div className="rounded-xl bg-soft-terracotta/70 border border-warm-stone/30 shadow-md p-6 space-y-4">
      {course?.courseContent?.map((section) => (
        <details
          key={section._id}
          open
          className="rounded-lg border border-warm-stone/30 bg-soft-terracotta shadow-sm"
        >
          {/* SECTION HEADER */}
          <summary className="flex cursor-pointer items-center justify-between px-4 py-3 border-b border-warm-stone/30">
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu className="text-2xl text-espresso-brown" />
              <p className="font-semibold text-espresso-brown">
                {section.sectionName}
              </p>
            </div>

            <div className="flex items-center gap-x-3 text-warm-stone">
              <button
                onClick={() =>
                  handleChangeEditSectionName(section.sectionName, section._id)
                }
              >
                <MdEdit className="text-xl text-espresso-brown" />
              </button>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All lectures in this section will be removed.",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <RiDeleteBin6Line className="text-xl hover:text-pink-400 transition-colors" />
              </button>
              <span className="font-medium text-warm-stone">|</span>
              <AiFillCaretDown className="text-xl text-warm-stone" />
            </div>
          </summary>

          {/* SUB-SECTIONS */}
          <div className="px-6 py-3 space-y-2">
            {section.subSection?.map((data) => (
              <div
                key={data?._id}
                onClick={() => setViewSubSection(data)}
                className="flex cursor-pointer items-center justify-between rounded-md border border-warm-stone/30 bg-warm-stone/10 hover:bg-warm-stone/20 transition-colors px-3 py-2"
              >
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-xl text-soft-terracotta" />
                  <p className="text-espresso-brown font-medium">
                    {data.title}
                  </p>
                </div>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-x-3 text-warm-stone"
                >
                  <button
                    onClick={() =>
                      setEditSubSection({ ...data, sectionId: section._id })
                    }
                  >
                    <MdEdit className="text-lg text-espresso-brown" />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Lecture?",
                        text2: "This action cannot be undone.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(data._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line className="text-lg hover:text-pink-400 transition-colors" />
                  </button>
                </div>
              </div>
            ))}

            {/* ADD NEW SUB-SECTION */}
            <button
              onClick={() => setAddSubsection({ sectionId: section._id })}
              className="mt-2 flex items-center gap-x-2 text-warm-stone font-medium hover:text-burnt-sienna transition-colors"
            >
              <FaPlus className="text-sm " />
              <span>Add Lecture</span>
            </button>
          </div>
        </details>
      ))}

      {/* MODALS */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}



// export default function NestedView({ handleChangeEditSectionName }) {
//   const { course } = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   // States to keep track of mode of modal [add, view, edit]
//   const [addSubSection, setAddSubsection] = useState(null)
//   const [viewSubSection, setViewSubSection] = useState(null)
//   const [editSubSection, setEditSubSection] = useState(null)
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)


//   const handleDeleteSection = async (sectionId) => {
//     const result = await deleteSection({
//       sectionId,
//       courseId: course._id,
//       token,
//     })
//     if (result) {
//       // Assuming the API returns the updated course object after deletion
//       dispatch(setCourse(result))
//     }
//     setConfirmationModal(null)
//   }


// const handleDeleteSubSection = async (subSectionId, sectionId) => {
    
//   // --- THIS IS THE FIX ---
//   // We now create a single 'data' object containing the IDs.
//   const result = await deleteSubSection(
//     { subSectionId: subSectionId, sectionId: sectionId, courseId: course._id }, 
//     token // The token is now correctly passed as the second argument.
//   );
//   // --- END OF FIX ---
  
//   if (result) {
//     // This logic to update the Redux store is now correct
//     const updatedCourseContent = course.courseContent.map((section) =>
//       section._id === sectionId ? result : section
//     );
//     const updatedCourse = { ...course, courseContent: updatedCourseContent };
//     dispatch(setCourse(updatedCourse));
//   }
//   setConfirmationModal(null);
// };

//   console.log("Course content in NestedView:", course?.courseContent);

//   return (
//     <>
//       <div
//         className="rounded-lg bg-richblack-700 p-6 px-8"
//         id="nestedViewContainer"
//       >
//         {course?.courseContent?.map((section) => {
//           console.log(
//             "SubSection data for section:",
//             section?.sectionName ?? "Unnamed",
//             section?.subSection ?? []
//           );

//           return (
//             // Section Dropdown
//             <details key={section._id} open>
//               {/* Section Dropdown Content */}
//               <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
//                 <div className="flex items-center gap-x-3">
//                   <RxDropdownMenu className="text-2xl text-richblack-50" />
//                   <p className="font-semibold text-richblack-50">
//                     {section.sectionName}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-x-3">
//                   <button
//                     onClick={() =>
//                       handleChangeEditSectionName(section.sectionName, section._id)
//                     }
//                   >
//                     <MdEdit className="text-xl text-richblack-300" />
//                   </button>
//                   <button
//                     onClick={() =>
//                       setConfirmationModal({
//                         text1: "Delete this Section?",
//                         text2: "All the lectures in this section will be deleted",
//                         btn1Text: "Delete",
//                         btn2Text: "Cancel",
//                         btn1Handler: () => handleDeleteSection(section._id),
//                         btn2Handler: () => setConfirmationModal(null),
//                       })
//                     }
//                   >
//                     <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                   </button>
//                   <span className="font-medium text-richblack-300">|</span>
//                   <AiFillCaretDown className="text-xl text-richblack-300" />
//                 </div>
//               </summary>

//               <div className="px-6 pb-4">
//                 {/* Render All Sub Sections Within a Section */}
//                 {section.subSection?.map((data) => (
//                   <div
//                     key={data?._id}
//                     onClick={() => setViewSubSection(data)}
//                     className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
//                   >
//                     <div className="flex items-center gap-x-3 py-2">
//                       <RxDropdownMenu className="text-2xl text-richblack-50" />
//                       <p className="font-semibold text-richblack-50">{data.title}</p>
//                     </div>
//                     <div
//                       onClick={(e) => e.stopPropagation()}
//                       className="flex items-center gap-x-3"
//                     >
                      
//                       <button
//                         onClick={() =>
//                           setEditSubSection({ ...data, sectionId: section._id })
//                         }
//                       >
//                         <MdEdit className="text-xl text-richblack-300" />
//                       </button>
//                       <button
//                         onClick={() =>
//                           setConfirmationModal({
//                             text1: "Delete this Sub-Section?",
//                             text2: "This lecture will be deleted",
//                             btn1Text: "Delete",
//                             btn2Text: "Cancel",
//                             btn1Handler: () =>
//                               handleDeleteSubSection(data._id, section._id),
//                             btn2Handler: () => setConfirmationModal(null),
//                           })
//                         }
//                       >
//                         <RiDeleteBin6Line className="text-xl text-richblack-300" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Add New Lecture to Section */}
//                 <button
//                   onClick={() => setAddSubsection({ sectionId: section._id })}
//                   className="mt-3 flex items-center gap-x-1 text-yellow-50"
//                 >
//                   <FaPlus className="text-lg" />
//                   <p>Add Lecture</p>
//                 </button>
//               </div>
//             </details>
//           );
//         })}

//       {/* Modal Display */}
//       {addSubSection ? (
//         <SubSectionModal
//           modalData={addSubSection}
//           setModalData={setAddSubsection}
//           add={true}
//         />
//       ) : viewSubSection ? (
//         <SubSectionModal
//           modalData={viewSubSection}
//           setModalData={setViewSubSection}
//           view={true}
//         />
//       ) : editSubSection ? (
//         <SubSectionModal
//           modalData={editSubSection}
//           setModalData={setEditSubSection}
//           edit={true}
//         />
//       ) : (
//         <></>
//       )}
//       {/* Confirmation Modal */}
//       {confirmationModal ? (
//         <ConfirmationModal modalData={confirmationModal} />
//       ) : (
//         <></>
//       )}
//       </div>
//     </>
//   )
// }