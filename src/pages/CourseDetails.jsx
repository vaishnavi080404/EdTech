import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
// import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
// import ReviewSlider from "../components/common/ReviewSlider"
// import { MdOutlineRateReview } from 'react-icons/md'
import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeautreAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import { FaCheckCircle } from "react-icons/fa"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()
  // console.log(`course id: ${courseId}`)

  // Declear a state to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        // console.log("course details res: ", res)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  // console.log("response: ", response)

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])
  // console.log("avgReviewCount: ", avgReviewCount)

  // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }


return (
  <>
    {/* --- REIMAGINED HERO SECTION --- */}
    <div className="relative w-full bg-gradient-to-r from-espresso-brown to-burnt-sienna/40 text-white">
      <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
        <div className="mx-auto grid min-h-[400px] max-w-maxContentTab items-center py-8 lg:mx-0 lg:grid-cols-[2fr_1fr] lg:py-20 gap-10">
          
          {/* Left Side: Course Info */}
          <div className="relative z-20 flex flex-col justify-center gap-4 text-soft-terracotta">
            <h1 className="text-3xl font-bold sm:text-[42px]">{courseName}</h1>
            <p className="text-soft-terracotta/80 text-sm sm:text-base">{courseDescription}</p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-md">
              <span className="flex items-center gap-2 text-golden-sunshine font-semibold">
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
              </span>
              <span>{`(${ratingAndReviews.length} reviews)`}</span>
              <span>{`${studentsEnrolled.length} students enrolled`}</span>
            </div>
            
            <p className="text-sm sm:text-base">Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
            
            <div className="flex flex-wrap gap-4 text-sm sm:text-lg">
              <p className="flex items-center gap-2">
                <BiInfoCircle className="shrink-0" /> Created at {formatDate(createdAt)}
              </p>
              <p className="flex items-center gap-2">
                <HiOutlineGlobeAlt className="shrink-0" /> English
              </p>
            </div>
          </div>
          
          {/* Floating Buy Card (hidden on small, sticky on large) */}
          <div className="relative mx-auto w-full max-w-[410px] sm:w-2/3 md:w-1/2 lg:absolute lg:right-[1rem] lg:top-[60px] lg:block hidden">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>

        {/* Buy Card visible on mobile (below hero) */}
        <div className="block lg:hidden my-6">
          <CourseDetailsCard
            course={response?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
    </div>

    {/* --- LIGHT THEME MAIN CONTENT AREA --- */}
    <div className="bg-soft-terracotta text-espresso-brown">
      <div className="mx-auto box-content px-4 lg:w-[1260px] py-10 sm:py-12">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          
          {/* What you'll learn */}
          <div className="my-8 rounded-lg border border-warm-stone/20 bg-warm-stone/10 p-4 sm:p-6 lg:p-8">
            <p className="text-2xl sm:text-3xl font-bold">What you'll learn</p>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-espresso-brown/90">
              {whatYouWillLearn.split("\n").map((point, index) => (
                point && (
                  <p key={index} className="flex items-start gap-2">
                    <FaCheckCircle className="text-rich-teal mt-1 shrink-0" />
                    <span>{point}</span>
                  </p>
                )
              ))}
            </div>
          </div>

          {/* Course Content */}
          <div className="space-y-4">
            <p className="text-2xl sm:text-[28px] font-bold">Course Content</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm sm:text-base">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-espresso-brown/80">
                <span>{courseContent?.length} section(s)</span>
                <span>{totalNoOfLectures} lecture(s)</span>
                <span>{response.data?.totalDuration} total length</span>
              </div>
              <button
                className="font-semibold text-burnt-sienna text-left sm:text-right"
                onClick={() => setIsActive([])}
              >
                Collapse all sections
              </button>
            </div>
          </div>

          {/* Accordion */}
          <div className="py-4">
            {courseContent?.map((course, index) => (
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>

          {/* Author */}
          <div className="mb-12 py-4">
            <p className="text-2xl sm:text-[28px] font-bold">Author</p>
            <div className="flex items-center gap-4 py-4">
              <img
                src={instructor.image || "..."}
                alt="Author"
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
              />
              <p className="text-base sm:text-lg font-semibold">{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p className="text-sm sm:text-base text-espresso-brown/80 leading-relaxed">
              {instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </>
);
}
export default CourseDetails

//   return (
//     <>
//       <div className={`relative w-full bg-richblack-800`}>
//         {/* Hero Section */}
//         <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
//           <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
//             <div className="relative block max-h-[30rem] lg:hidden">
//               <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
//               <img
//                 src={thumbnail}
//                 alt="course thumbnail"
//                 className="aspect-auto w-full"
//               />
//             </div>
//             <div
//               className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
//             >
//               <div>
//                 <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
//                   {courseName}
//                 </p>
//               </div>
//               <p className={`text-richblack-200`}>{courseDescription}</p>
//               <div className="text-md flex flex-wrap items-center gap-2">
//                 <span className="text-yellow-25">{avgReviewCount}</span>
//                 <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
//                 <span>{`(${ratingAndReviews.length} reviews)`}</span>
//                 <span>{`${studentsEnrolled.length} students enrolled`}</span>
//               </div>
//               <div>
//                 <p className="">
//                   Created By {`${instructor.firstName} ${instructor.lastName}`}
//                 </p>
//               </div>
//               <div className="flex flex-wrap gap-5 text-lg">
//                 <p className="flex items-center gap-2">
//                   {" "}
//                   <BiInfoCircle /> Created at {formatDate(createdAt)}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   {" "}
//                   <HiOutlineGlobeAlt /> English
//                 </p>
//               </div>
//             </div>
//             <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
//               <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
//                 Rs. {price}
//               </p>
//               <button className="yellowButton" onClick={handleBuyCourse}>
//                 Buy Now 
//               </button>
//               <button className="blackButton">Add to Cart</button>
//             </div>
//           </div>
//           {/* Courses Card */}
//           <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
//             <CourseDetailsCard
//               course={response?.data?.courseDetails}
//               setConfirmationModal={setConfirmationModal}
//               handleBuyCourse={handleBuyCourse}
//             />
//           </div>
//         </div>
       
//       </div>
//       <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
//         <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
//           {/* What will you learn section */}
//           <div className="my-8 border border-richblack-600 p-8">
//             <p className="text-3xl font-semibold">What you'll learn</p>
//             <div className="mt-5">
//               {/* <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown> */}
//               <p>heyyheyy</p>
//             </div>
//           </div>

//           {/* Course Content Section */}
//           <div className="max-w-[830px] ">
//             <div className="flex flex-col gap-3">
//               <p className="text-[28px] font-semibold">Course Content</p>
//               <div className="flex flex-wrap justify-between gap-2">
//                 <div className="flex gap-2">
//                   <span>
//                     {courseContent?.length} {`section(s)`}
//                   </span>
//                   <span>
//                     {totalNoOfLectures} {`lecture(s)`}
//                   </span>
//                   <span>{response.data?.totalDuration} total length</span>
//                 </div>
//                 <div>
//                   <button
//                     className="text-yellow-25"
//                     onClick={() => setIsActive([])}
//                   >
//                     Collapse all sections
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Course Details Accordion */}
//             <div className="py-4">
//               {courseContent?.map((course, index) => (
//                 <CourseAccordionBar
//                   course={course}
//                   key={index}
//                   isActive={isActive}
//                   handleActive={handleActive}
//                 />
//               ))}
//             </div>

//             {/* Author Details */}
//             <div className="mb-12 py-4">
//               <p className="text-[28px] font-semibold">Author</p>
//               <div className="flex items-center gap-4 py-4">
//                 <img
//                   src={
//                     instructor.image
//                       ? instructor.image
//                       : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
//                   }
//                   alt="Author"
//                   className="h-14 w-14 rounded-full object-cover"
//                 />
//                 <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
//               </div>
//               <p className="text-richblack-50">
//                 {instructor?.additionalDetails?.about}
//               </p>
//             </div>
//           </div>
//         </div>
//          {/* Reviws from Other Learner */}
//       {/* <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
//          <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
//               Reviews from other learners <MdOutlineRateReview className='text-yellow-25' />
//           </h1>
//           <ReviewSlider />
//       </div> */}
//       </div>
//       <Footer />
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }

// export default CourseDetails


