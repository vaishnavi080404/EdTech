import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import instructorVideo from '../../../assets/instructor.mp4'
import { useInView } from 'react-intersection-observer'; // 1. Import the hook

const InstructorSection = () => {
  // 2. Setup the observer to trigger the animation on scroll
  const { ref, inView } = useInView({
    threshold: 0.3, // Trigger when 30% of the section is visible
    triggerOnce: true,
  });

  return (
    // 3. Attach the ref to the main container
    <div className='my-16' ref={ref}>
      <div className='flex flex-col lg:flex-row gap-20 items-center'>
        
        {/* Left Side: Video with Decorative Blob */}
        <div className={`
          lg:w-[50%] relative transition-all duration-700
          ${inView ? 'opacity-100 animate-fadeIn-left' : 'opacity-0'}
        `}>
          {/* Subtle background blob for depth and visual interest */}
          <div className="absolute -top-5 -left-5 w-[500px] h-[500px] bg-soft-terracotta rounded-full blur-3xl opacity-70 z-0"></div>
          
          <video
            className="relative z-10 w-full h-auto rounded-lg shadow-2xl shadow-warm-stone/30"
            src={instructorVideo} muted loop autoPlay playsInline
          />
        </div>

        {/* Right Side: Text Content */}
        <div className={`
          lg:w-[50%] flex flex-col gap-10 items-start
          transition-all duration-700
          ${inView ? 'opacity-100 animate-fadeIn-right' : 'opacity-0'}
        `}
        style={{ transitionDelay: '200ms' }} // Text animates slightly after the video
        >
          {/* Increased width and font size for better impact */}
          <div className='text-5xl font-bold w-[90%] text-espresso-brown'>
            Become an <HighlightText text={"Instructor"} />
          </div>
          
          {/* Increased line height for better readability */}
          <p className='font-medium text-[16px] w-[90%] text-espresso-brown/80 leading-relaxed'>
            Instructors from around the world teach millions of students on EdTech. We provide the tools and skills to teach what you love. 
          </p>
          
          <div className='w-fit'>
            <CTAButton active={true} linkto={'/signup'}>
              <div className='flex flex-row gap-2 items-center'>
                Start Teaching Today
                <FaArrowRight/>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection


// import React from 'react'
// import HighlightText from './HighlightText'
// import CTAButton from './Button'
// import { FaArrowRight } from 'react-icons/fa'
// import instructorVideo from '../../../assets/instructor.mp4'
// const InstructorSection = () => {
//   return (
//     <div className='mb-16'>
//       <div className='flex flex-row gap-20 items-center'>
//         <div className='w-[50%] relative mx-auto ml-20'>
            
//                       <video
//                       className=" w-[500px] h-[500px] rounded-lg " // Full screen background styles
//                       src={instructorVideo}
//                       muted
//                       loop
//                       autoPlay
//                       playsInline
//                     >
//                     </video>

//         </div>

//         <div className='w-[50%] flex flex-col gap-10' >
//             <div className='text-4xl font-semibold w-[50%]'>
//                 Become an
//                 <HighlightText text={"Instructor"}/>
//             </div>
//             <p className='font-medium text-[16px] w-[80%] text-gray-700'>
//                 Instructors from around the world tech millions of students on EdTech.
//                 We provide the tools and skills to teach what you love. 
//             </p>

//             <div className='w-fit'>
//                  <CTAButton active={true} linkto={'/signup'}>
//                 <div className='flex flex-row gap-2 items-center '>
//                     Start Teaching today
//                     <FaArrowRight/>
//                 </div>
//             </CTAButton>
//             </div>

           

//         </div>

//       </div>
//     </div>
//   )
// }

// export default InstructorSection
