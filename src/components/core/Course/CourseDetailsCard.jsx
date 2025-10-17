import React from "react"

import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/CartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import IconBtn from "../../common/IconBtn"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
     const textToCopy = window.location.href;

        // Use the modern Navigator Clipboard API
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // This runs if the copy was successful
                toast.success("Link copied to clipboard!");
            })
            .catch(err => {
                // This runs if the copy failed
                console.error("Failed to copy text: ", err);
                toast.error("Failed to copy link");
            });
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }


  return (
    <div className="pr-2">
      <div
      className={`flex flex-col gap-4 rounded-xl bg-warm-stone/10 backdrop-blur-lg border border-mid-gray/20 p-4 text-soft-terracotta shadow-2xl
      w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-full`}
    >
      {/* --- Thumbnail --- */}
      <div className="relative">
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="w-full h-auto max-h-[280px] sm:max-h-[300px] rounded-lg object-cover"
        />
      </div>

      <div className="px-2">
        {/* --- Price --- */}
        <div className="pb-4 text-2xl sm:text-3xl font-bold text-espresso-brown">
          ₹ {CurrentPrice}
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <IconBtn
            text={
              user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"
            }
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () =>
                    navigate(
                      `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                : handleBuyCourse
            }
          />
          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <IconBtn
              text="Add to Cart"
              onClick={handleAddToCart}
              outline={true}
            />
          )}
        </div>

        <p className="pb-3 pt-6 text-center text-xs sm:text-sm text-espresso-brown/80">
          30-Day Money-Back Guarantee
        </p>

        {/* --- Course Includes --- */}
        <div>
          <p className="my-2 text-lg sm:text-xl font-semibold text-espresso-brown">
            This Course Includes:
          </p>
          <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm text-espresso-brown/90">
            {course?.instructions?.map((item, i) => (
              <p className="flex items-start gap-2" key={i}>
                <BsFillCaretRightFill className="text-rich-teal mt-1 shrink-0" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        {/* --- Share --- */}
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-4 sm:py-6 font-semibold text-yellow-500 transition-all duration-200 hover:scale-105"
            onClick={handleShare}
          >
            <FaShareSquare size={16} /> Share
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}


export default CourseDetailsCard


//   return (
//     <>
//       <div
//         className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
//       >
//         {/* Course Image */}
//         <img
//           src={ThumbnailImage}
//           alt={course?.courseName}
//           className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
//         />

//         <div className="px-4">
//           <div className="space-x-3 pb-4 text-3xl font-semibold">
//             Rs. {CurrentPrice}
//           </div>
//           <div className="flex flex-col gap-4">
//             <button
//               className="yellowButton"
//               onClick={
//                 user && course?.studentsEnrolled.includes(user?._id)
//                   ? () => navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)
//                   : handleBuyCourse
//               }
//             >
//               {user && course?.studentsEnrolled.includes(user?._id)
//                 ? "Go To Course"
//                 : "Buy Now"}
//             </button>
//             {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
//               <button onClick={handleAddToCart} className="blackButton">
//                 Add to Cart
//               </button>
//             )}
//           </div>
//           <div>
//             <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
//               30-Day Money-Back Guarantee
//             </p>
//           </div>

//           <div className={``}>
//             <p className={`my-2 text-xl font-semibold `}>
//               This Course Includes :
//             </p>
//             <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
//               {course?.instructions?.map((item, i) => {
//                 return (
//                   <p className={`flex gap-2`} key={i}>
//                     <BsFillCaretRightFill />
//                     <span>{item}</span>
//                   </p>
//                 )
//               })}
//             </div>
//           </div>
//           <div className="text-center">
//             <button
//               className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
//               onClick={handleShare}
//             >
//               <FaShareSquare size={15} /> Share
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CourseDetailsCard

