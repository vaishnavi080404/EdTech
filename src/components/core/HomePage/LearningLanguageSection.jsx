
import React from 'react'
import HighlightText from './HighlightText'
import CtAButton from "./Button"
import LLS1 from '../../../assets/LLS1.png'
import LLS2 from '../../../assets/LLS2.png'
import LLS3 from '../../../assets/LLS3.png'
import { useInView } from 'react-intersection-observer';

const LearningLanguageSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div className="mt-20 mb-16 px-4 sm:px-6 md:px-10" ref={ref}>
      <div className="flex flex-col gap-5 items-center">
        
        {/* Heading */}
        <div 
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-center transition-opacity duration-500 
          ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          Your swiss knife for <HighlightText text={"learning any language"} />
        </div>
        
        {/* Subheading */}
        <div 
          className={`text-center text-espresso-brown/80 max-w-xl text-sm sm:text-base md:text-lg font-medium transition-opacity duration-500 
          ${inView ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '200ms' }}
        >
          Using spin making learning multiple languages easy...
        </div>

        {/* Image Cluster */}
        <div className="flex flex-col sm:flex-row items-center justify-center mt-8 gap-6 sm:gap-0">
          
          {/* Image 1 */}
          <img 
            src={LLS1}
            alt="KnowYourProgressImage"
            className={`
              object-contain w-[70%] sm:w-[35%] md:w-[30%] lg:w-[35%]
              transition-all duration-300
              ${inView ? 'animate-zoom-and-shake opacity-100' : 'opacity-0'}
              sm:-mr-10 md:-mr-16 sm:rotate-[10deg] md:rotate-[20deg]
            `}
            style={{ animationDelay: '200ms' }}
          />

          {/* Image 2 (Center) */}
          <img 
            src={LLS3}
            alt="CompareWithOthersImage"
            className={`
              object-contain w-[75%] sm:w-[40%] md:w-[35%] lg:w-[32%] z-10
              transition-all duration-300
              ${inView ? 'animate-zoom-and-shake opacity-100' : 'opacity-0'}
            `}
            style={{ animationDelay: '0ms' }}
          />

          {/* Image 3 */}
          <img 
            src={LLS2}
            alt="PlanYourLessonsImage"
            className={`
              object-contain w-[70%] sm:w-[35%] md:w-[30%] lg:w-[35%]
              transition-all duration-300
              ${inView ? 'animate-zoom-and-shake opacity-100' : 'opacity-0'}
              sm:-ml-10 md:-ml-20 sm:-rotate-[5deg] md:-rotate-[10deg]
            `}
            style={{ animationDelay: '400ms' }}
          />
        </div>

        {/* Animated Button */}
        <div 
          className={`w-fit transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'} mt-10`}
          style={{ transitionDelay: '600ms' }}
        >
          <CtAButton active={true} linkto={"/signup"}>
            Learn more
          </CtAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection

// import React from 'react'
// import HighlightText from './HighlightText'
// import CtAButton from "./Button"
// import LLS1 from '../../../assets/LLS1.png'
// import LLS2 from '../../../assets/LLS2.png'
// import LLS3 from '../../../assets/LLS3.png'
// const LearningLanguageSection = () => {
//   return (
//     // <div className='mt-[150px] mb-22'>
//     //   <div className='flex flex-col gap-5 items-center '>
//     //     <div className='text-4xl font-semibold text-center'>
//     //         Your swiss knife for
//     //         <HighlightText text={"learning any language"}/>  
//     //     </div>
        
//     //     <div className='text-center text-black mx-auto text-base font-medium'>
//     //         Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, <br></br>progress tracking, custom schedule and more

//     //     </div>
//         <div className='mt-[150px] mb-22'>
//       <div className='flex flex-col gap-5 items-center'>
//         <div className='text-4xl font-semibold text-center'>
//           Your swiss knife for <HighlightText text={"learning any language"} />
//         </div>
//         {/* Text is now the primary espresso-brown */}
//         <div className='text-center text-espresso-brown/80 mx-auto text-base font-medium'>
//           Using spin making learning multiple languages easy...
//         </div>

//  <div className='flex flex-row items-center justify-center mt-15'>
//                 <img 
//                     src = {LLS1}
//                     alt = "KNowYourProgressImage"
//                     className='object-contain -mr-15 h-[390px] rotate-[20deg] '
//                 />
//                 <img 
//                     src = {LLS3}
//                     alt = "KNowYourProgressImage"
//                     className='object-contain h-[400px]'
//                 />
//                 <img 
//                     src = {LLS2}
//                     alt = "KNowYourProgressImage"
//                     className='object-contain -rotate-[10deg] -ml-20 h-[390px]'
//                 />
//             </div>
//         <div className='w-fit '>
//             <CtAButton active={true} linkto={"/signup"}>
//             Learn more
                
//             </CtAButton>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default LearningLanguageSection

