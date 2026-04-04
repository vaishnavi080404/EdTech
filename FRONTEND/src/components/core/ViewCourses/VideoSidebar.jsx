import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  
  useEffect(() => {
    let lectures = 0
    courseSectionData.forEach((section) => {
      lectures += section.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [courseSectionData])

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  return (
    <>
      
      <button 
        onClick={() => setIsSidebarVisible(true)}
        className={`
          lg:hidden fixed top-20 left-4 z-50 p-2 bg-burnt-sienna text-white rounded-full shadow-lg
          transition-transform duration-300
          ${isSidebarVisible ? '-translate-x-24' : 'translate-x-0'}
        `}
      >
        <GiHamburgerMenu size={24} />
      </button>

      
      
      <div className={`
        fixed top-14 left-0 h-[calc(100vh-3.5rem)] z-40
        flex w-[320px] max-w-[350px] flex-col 
        border-r border-warm-stone/20 bg-espresso-brown/50
        transition-transform duration-300
        ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-warm-stone/50 py-5 text-lg font-bold text-soft-terracotta">
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => navigate(`/dashboard/enrolled-courses`)}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-warm-stone/50 text-soft-terracotta cursor-pointer transition-all duration-200 hover:scale-95 hover:bg-warm-stone"
              title="Back to Courses"
            >
              <IoIosArrowBack size={20} />
            </div>
            
            <button 
              className="lg:hidden text-2xl text-soft-terracotta" 
              onClick={() => setIsSidebarVisible(false)}
            >
              &times;
            </button>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto hidden lg:flex" 
              onClick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-white">{courseEntireData?.courseName}</p>
            
            <div className="mt-2 text-sm font-semibold text-soft-terracotta/80">
              <span>{completedLectures?.length || 0} /  {totalNoOfLectures} lectures completed</span>
              <div className="mt-1 w-full h-2 rounded-full bg-green-700">
                <div 
                  className="h-full rounded-full bg-rich-teal transition-all duration-500"
                  style={{ width: `${totalNoOfLectures > 0 ? (completedLectures?.length / totalNoOfLectures) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="flex-1 overflow-y-auto">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-soft-terracotta"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
           
              <div className="flex flex-row justify-between bg-warm-stone/20 px-5 py-4">
                <div className="w-[70%] font-semibold text-white">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`transition-transform duration-500 ${activeStatus === section?._id ? "rotate-180" : "rotate-0"}`}>
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              
              {activeStatus === section?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-3 transition-all duration-200 ${
                        videoBarActive === topic._id
                          ? "bg-burnt-sienna font-semibold text-white"
                          : "hover:bg-warm-stone/20"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`);
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        readOnly
                        className="accent-rich-teal"
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}