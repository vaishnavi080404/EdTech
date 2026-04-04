import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourseForm from './PublishCourseForm/PublishCourse'

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course)

  const steps = [
    { id: 1, titl: "Course Information" },
    { id: 2, title: "Course Build" },
    { id: 3, title: "Publish" }
  ]


return (
    // Main container
    <div className="px-4 ">
      {/* --- RESPONSIVE STEPPER INDICATOR --- */}
      <div className="relative mb-8 flex w-full justify-center">
        <div className="flex w-full max-w-2xl items-start">
          {steps.map((item) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold
                    transition-all duration-300
                    ${step === item.id
                      ? "bg-yellow-200 border-burnt-sienna text-espresso-brown" // Active Step
                      : step > item.id
                      ? "bg-rich-teal border-green-300 text-black" // Completed Step
                      : "bg-soft-terracotta/20 border-rose-100 text-espresso-brown" // Inactive Step
                    }
                  `}
                >
                  {step > item.id ?
                   <FaCheck
                  className='text-green-800' /> : item.id}
                </div>
                {/* Step Title (Visible on larger screens) */}
                <p className="hidden md:block mt-2 text-sm text-center text-soft-terracotta/80 w-28">
                  {item.title}
                </p>
              </div>

              {/* Connector Line (Not shown after the last step) */}
              {item.id !== steps.length && (
                <div className="flex-1 h-[2px] mt-5 bg-rose-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* --- STEP TITLES FOR MOBILE --- */}
      {/* A simplified view for smaller screens */}
      <div className="md:hidden text-center mb-8">
        <p className="text-xl font-semibold text-white">{steps[step - 1].title}</p>
      </div>

      {/* --- RENDER THE CURRENT STEP'S FORM --- */}
      <div className="mt-8">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourseForm />}
      </div>
    </div>
  )
}

export default RenderSteps

//   return (
//     <div>
//       <div className="flex items-center gap-4">
//         {steps.map((item, index) => (
//           <React.Fragment key={item.id}>
//             <div
//               className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
//                 step === item.id
//                   ? "bg-yellow-200 border-amber-200 text-white"
//                   : step > item.id
//                   ? "bg-green-500 border-green-600 text-white"
//                   : "bg-gray-500 border-gray-400 text-gray-300"
//               }`}
//             >
//               {step > item.id ? <FaCheck /> : item.id}
//             </div>

//             {/* Add dash between steps */}
//             {index !== steps.length - 1 && (
//               <div className="w-10 h-[2px] bg-gray-400"></div>
//             )}
//           </React.Fragment>
          
//         ))}
//         <div>
//             {steps.map((item)=>{
//                 <>
//                 <div>
//                     <p>{item.title}</p>
//                 </div>
//                 </>
//             })}
//         </div>
//         {step === 1 && <CourseInformationForm/>}
//         {step ===2 && <CourseBuilderForm/>}
//         {step ===3 && <PublishCourseForm/>}  
//       </div>
//     </div>
//   )
// }

// export default RenderSteps

