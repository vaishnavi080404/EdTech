import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
   
    <div>
      <div className="flex justify-between py-2 px-2 rounded-md hover:bg-warm-stone/10 transition-colors duration-200">
        <div className="flex items-center gap-3 text-espresso-brown/90">
          
          <span>
            <HiOutlineVideoCamera className="text-rich-teal" />
          </span>
          <p>{subSec?.title}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion

