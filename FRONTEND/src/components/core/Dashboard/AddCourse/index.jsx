import React from 'react'
import RenderSteps from './RenderSteps'
import { BsLightningCharge } from 'react-icons/bs' // A nice icon for the tips section

const AddCourse = () => {
  return (
    // --- STYLED MAIN CONTAINER ---
    // Using the branded dark theme for a focused environment
    <div className='w-full text-soft-terracotta p-6'>
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
        
        {/* Left Column: Main Form Area */}
        <div className='flex-1 lg:w-[60%]'>
          <h1 className="text-3xl font-bold mt-8">Add Course</h1>
          <div>
            <RenderSteps/>
          </div>
        </div>
        
        {/* Right Column: Course Upload Tips Card */}
        <div className='lg:w-[40%]'>
          <div className="sticky top-10 bg-mid-gray/20 border border-soft-terracotta/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <BsLightningCharge className="text-golden-sunshine" />
              Course Upload Tips
            </h2>
            <ul className="space-y-4 text-xs text-soft-terracotta/80 list-disc list-inside">
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024x576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create & organize a course.</li>
              <li>
                Add Topics in the Course Builder section to create lessons,
                quizzes, and assignments.
              </li>
              <li>
                Information from the Additional Data section shows up on the
                course single page.
              </li>
              <li>Make Announcements to notify any important notes to all enrolled students at once.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddCourse


// import React from 'react'
// import RenderSteps from './RenderSteps'

// const AddCourse = () => {
//   return (
//     <div className='text-white'>
//       <div>
//         <div>
//             <h1>Add Course</h1>
//             <div>
//                 <RenderSteps/>
//             </div>
//         </div>
//         <div>
//             <p>Code Upload Tips</p>
//             <ul>
//             <li>Set the Course Price option or make it free.</li>
//             <li>Standard size for the course thumbnail is 1024x576.</li>
//             <li>Video section controls the course overview video.</li>
//             <li>Course Builder is where you create & organize a course.</li>
//             <li>
//               Add Topics in the Course Builder section to create lessons,
//               quizzes, and assignments.
//             </li>
//             <li>
//               Information from the Additional Data section shows up on the
//               course single page.
//             </li>
//             <li>Make Announcements to notify any important</li>
//             <li>Notes to all enrolled students at once.</li>

//             </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddCourse