import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

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

  // getting courseId from url parameter
  const { courseId } = useParams()
  // console.log(`course id: ${courseId}`)

  
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  useEffect(() => {
   
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

  // calculating Avg Review count
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

  // total number of lectures
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
   
    <div className="relative w-full bg-gradient-to-r from-espresso-brown to-burnt-sienna/40 text-white">
      <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
        <div className="mx-auto grid min-h-[400px] max-w-maxContentTab items-center py-8 lg:mx-0 lg:grid-cols-[2fr_1fr] lg:py-20 gap-10">
          

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
          
          
          <div className="relative mx-auto w-full max-w-[410px] sm:w-2/3 md:w-1/2 lg:absolute lg:right-[1rem] lg:top-[60px] lg:block hidden">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>

        <div className="block lg:hidden my-6">
          <CourseDetailsCard
            course={response?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
    </div>


    <div className="bg-soft-terracotta text-espresso-brown">
      <div className="mx-auto box-content px-4 lg:w-[1260px] py-10 sm:py-12">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          
   
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
