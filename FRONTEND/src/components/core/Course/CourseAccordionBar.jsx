import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])


return (
    
    <div className="border-b border-warm-stone/20">
      
      
      <div
        className={`flex cursor-pointer items-center justify-between p-4 transition-all duration-300
                    ${active ? "bg-warm-stone/20" : "hover:bg-warm-stone/10"}`}
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-3">
          
          <i className={`transition-transform duration-300 ${active ? "rotate-180" : "rotate-0"}`}>
            <AiOutlineDown />
          </i>
          <p className="font-semibold text-espresso-brown">{course?.sectionName}</p>
        </div>
        
        <div className="space-x-4">
          <span className="font-semibold text-burnt-sienna">
            {`${course.subSection.length || 0} lecture(s)`}
          </span>
        </div>
      </div>

  
      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden bg-soft-terracotta transition-[height] duration-300 ease-in-out"
        style={{
          height: sectionHeight,
        }}
      >
        <div className="flex flex-col gap-2 px-6 py-4">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}
