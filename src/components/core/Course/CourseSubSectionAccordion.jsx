import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    // Main container for each sub-section item
    <div>
      <div className="flex justify-between py-2 px-2 rounded-md hover:bg-warm-stone/10 transition-colors duration-200">
        <div className="flex items-center gap-3 text-espresso-brown/90">
          {/* Icon with branded color */}
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

// import React, { useEffect, useRef, useState } from "react"
// import { AiOutlineDown } from "react-icons/ai"
// import { HiOutlineVideoCamera } from "react-icons/hi"

// function CourseSubSectionAccordion({ subSec }) {
//   return (
//     <div>
//       <div className="flex justify-between py-2">
//         <div className={`flex items-center gap-2`}>
//           <span>
//             <HiOutlineVideoCamera />
//           </span>
//           <p>{subSec?.title}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CourseSubSectionAccordion