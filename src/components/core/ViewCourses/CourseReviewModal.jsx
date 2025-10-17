
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"

// 1. Import the new, reliable rating component and its required CSS
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  // 2. Add a dedicated state to visually control the rating
  const [rating, setRating] = useState(0)

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    setRating(0) // Also reset the visual rating state
  }, [])

  // 3. This handler now updates both the visual state and the form's state
  const handleRatingChange = (newRating) => {
    if (newRating === 0) return; // Prevent un-setting the rating by clicking again
    setRating(newRating) // Update the visual state to trigger a re-render
    setValue("courseRating", newRating) // Update the form data for submission
  }

  const onSubmit = async (data) => {
    if (data.courseRating === 0) {
      alert("Please provide a star rating by clicking on a star.");
      return;
    }
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  // Define custom styles for the stars
  const myStyles = {
    itemShapes: Star,
    activeFillColor: '#FFC700', // your 'golden-sunshine' color
    inactiveFillColor: 'rgba(74, 63, 53, 0.3)' // your semi-transparent 'espresso-brown'
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-espresso-brown/50 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-warm-stone/20 bg-soft-terracotta text-espresso-brown shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-warm-stone/10 p-5">
          <p className="text-xl font-semibold">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-espresso-brown/80 hover:text-espresso-brown" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image ? user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
              alt={`${user?.firstName} profile`}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-espresso-brown/80">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            {/* 4. Pass the visual rating state into the 'value' prop */}
            <Rating
              value={rating} // The component is now controlled by our state
              onChange={handleRatingChange}
              style={{ maxWidth: 200 }}
              itemStyles={myStyles}
              isRequired
            />
            
            {/* Experience Textarea */}
            <div className="flex w-full flex-col space-y-2 mt-4">
              <label className="text-sm text-espresso-brown" htmlFor="courseExperience">
                Add Your Experience <sup className="text-pink-400">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your thoughts about the course..."
                {...register("courseExperience", { required: true })}
                className="w-full mt-2 p-3 min-h-[130px] resize-none rounded-lg bg-warm-stone/10 border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-400">
                  Please share your experience.
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex w-full justify-end gap-x-4">
              <IconBtn
                onClick={() => setReviewModal(false)}
                text="Cancel"
                outline={true}
              />
              <IconBtn 
                text="Save"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// import { useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { RxCross2 } from "react-icons/rx"
// import ReactStars from "react-rating-stars-component"
// import { useSelector } from "react-redux"
// import { FaStar } from "react-icons/fa";
// import { createRating } from "../../../services/operations/courseDetailsAPI"
// import IconBtn from "../../common/IconBtn"

// export default function CourseReviewModal({ setReviewModal }) {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const { courseEntireData } = useSelector((state) => state.viewCourse)

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()

//   useEffect(() => {
//     setValue("courseExperience", "")
//     setValue("courseRating", 0)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const ratingChanged = (newRating) => {
//     setValue("courseRating", newRating)
//   }

//   const onSubmit = async (data) => {
//     await createRating(
//       {
//         courseId: courseEntireData._id,
//         rating: data.courseRating,
//         review: data.courseExperience,
//       },
//       token
//     )
//     // FIX #1: Close the modal on successful submission
//     setReviewModal(false)
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-gray-800 bg-opacity-1 backdrop-blur-lg">
//       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
//           <p className="text-xl font-semibold text-richblack-5">Add Review</p>
//           {/* FIX #2: Close the modal when the 'X' is clicked */}
//           <button onClick={() => setReviewModal(false)}>
//             <RxCross2 className="text-2xl text-richblack-5" />
//           </button>
//         </div>
//         {/* Modal Body */}
//         <div className="p-6">
// <div className="flex items-center justify-center gap-x-4">
//     {/* --- THIS IS THE FIX --- */}
//     {/* We provide a fallback DiceBear avatar if the user image doesn't exist */}
//     <img
//       src={
//         user?.image
//           ? user.image
//           : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
//       }
//       alt={user?.firstName + " profile"}
//       className="aspect-square w-[50px] rounded-full object-cover"
//     />
//     {/* --- END OF FIX --- */}
//     <div className="">
//       <p className="font-semibold text-richblack-5">
//         {user?.firstName} {user?.lastName}
//       </p>
//       <p className="text-sm text-richblack-5">Posting Publicly</p>
//     </div>
// </div>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="mt-6 flex flex-col items-center"
//           >
//             <ReactStars
//               count={5}
//               onChange={ratingChanged}
//               size={24}
//               activeColor="#ffd700"
//             />
//             <div className="flex w-11/12 flex-col space-y-2">
//               <label
//                 className="text-sm text-richblack-5"
//                 htmlFor="courseExperience"
//               >
//                 Add Your Experience <sup className="text-pink-200">*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder="Add Your Experience"
//                 {...register("courseExperience", { required: true })}
//                 className="form-style resize-x-none min-h-[130px] w-full"
//               />
//               {errors.courseExperience && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                   Please Add Your Experience
//                 </span>
//               )}
//             </div>
//             <div className="mt-6 flex w-11/12 justify-end gap-x-2">
//               <button
//                 type="button" // Good practice to add type="button" to non-submit buttons in a form
//                 onClick={() => setReviewModal(false)}
//                 className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//               >
//                 Cancel
//               </button>
//               <IconBtn 
//                 text="Save"
//                 type="submit" // Ensure this button can submit the form
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
