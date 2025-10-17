
import React from 'react';
import { SlBadge } from "react-icons/sl";
import { FaUserShield, FaHandsHelping, FaLightbulb } from "react-icons/fa";
import timeline from '../../../assets/timeline.png';
import { useInView } from 'react-intersection-observer'; // Import the hook

// The data array with unique icon colors
const timeLine = [
 {
    Logo: SlBadge,
    heading: "Leadership",
    description: "Fully committed to success company",
    color: "text-red-500",
  },
  {
    Logo: FaUserShield,
    heading: "Responsibility",
    description: "Takes ownership of tasks and outcomes",
    color: "text-blue-500",
  },
  {
    Logo: FaHandsHelping,
    heading: "Flexibility",
    description: "Adapts to changing circumstances with ease",
    color: "text-green-500",
  },
  {
    Logo: FaLightbulb,
    heading: "Solve the Problem",
    description: "Innovative thinker with practical solutions",
    color: "text-yellow-500",
  },
];

const TimeLineSection = () => {
  // Setup the observer hook to watch the main container
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the component is visible
    triggerOnce: true, // Animation will only play once
  });

  return (
    // Attach the 'ref' to the main container div to be observed
    <div ref={ref}>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        
        {/* Left Side: Animated Timeline Items */}
        <div className="lg:w-[45%] flex flex-col gap-14 relative">
          {/* The vertical dotted line */}
          <div className="absolute left-[28px] top-0 h-full w-0.5 border-l-2 border-dotted border-warm-stone z-0"></div>

          {timeLine.map((element, index) => {
            const IconComponent = element.Logo;
            const isEven = index % 2 === 0;

            return (
              // The animation classes are now applied ONLY when 'inView' is true
              <div 
                className={`
                  flex flex-row gap-6 items-center group relative z-10 
                  transition-all duration-500
                  ${inView ? 'opacity-100' : 'opacity-0'}
                  ${inView ? (isEven ? 'animate-fadeIn-left' : 'animate-fadeIn-right') : ''}
                `}
                // Use transition-delay for a smooth, staggered fade-in
                style={{ transitionDelay: `${index * 200}ms` }}
                key={index}
              >
                {/* Icon Circle with Hover Effect */}
                <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-soft-terracotta shadow-lg border-2 border-white 
                              transition-all duration-300 group-hover:scale-110">
                  <IconComponent className={`text-2xl ${element.color}`} />
                </div>

                {/* Text with Hover Effect */}
                <div className="transition-all duration-300 group-hover:translate-x-2">
                  <h2 className="font-semibold text-[18px] text-espresso-brown">{element.heading}</h2>
                  <p className="text-base text-espresso-brown/80">{element.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Image and Stats Card */}
        <div className={`
          relative shadow-lg lg:w-[55%]
          transition-all duration-500
          ${inView ? 'opacity-100' : 'opacity-0'}
          ${inView ? 'animate-fadeIn-right' : ''}
        `}
        style={{ transitionDelay: '800ms' }}
        >
          <img 
            src={timeline}
            alt='timelineimage'
            className='shadow-2xl shadow-burnt-sienna/20 object-cover h-fit rounded-lg'
          />
          <div className='absolute bg-rose-950 flex flex-col lg:flex-row text-white uppercase py-7
                          left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-2xl hover:scale-110 transition-all duration-300'>
            <div className='flex flex-row gap-5 items-center border-r border-warm-stone px-8'>
              <p className='text-3xl font-bold'>10</p>
              <p className='text-burnt-sienna text-sm font-medium leading-tight'>Years of <br/> Experience</p>
            </div>
            <div className='flex flex-row gap-5 items-center px-8'>
              <p className='text-3xl font-bold'>250</p>
              <p className='text-burnt-sienna text-sm font-medium leading-tight'>Types of <br/> Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;

// import React from 'react'
// import { SlBadge } from "react-icons/sl";
// import { FaUserShield, FaHandsHelping,FaLightbulb } from "react-icons/fa";
// import timeline from '../../../assets/timeline.png'

// const timeLine = [
//  {
//     Logo: SlBadge,
//     heading: "Leadership",
//     description: "Fully committed to success company",
//     color: "text-red-500",
//   },
//   {
//     Logo: FaUserShield,
//     heading: "Responsibility",
//     description: "Takes ownership of tasks and outcomes",
//     color: "text-blue-500",
//   },
//   {
//     Logo: FaHandsHelping,
//     heading: "Flexibility",
//     description: "Adapts to changing circumstances with ease",
//     color: "text-green-500",
//   },
//   {
//     Logo: FaLightbulb,
//     heading: "Solve the Problem",
//     description: "Innovative thinker with practical solutions",
//     color: "text-yellow-500",
//   },

// ];

// const TimeLineSection = () => {
//   return (
// <div>
// <div className="flex flex-row gap-10 items-start relative w-full">
//   {/* Vertical dotted line behind icons */}
//   <div className="absolute left-[38px] top-6 bottom-6 w-0.5 border-l-2 border-dotted border-gray-400 z-0"></div>

//   <div className="flex flex-col w-[45%] gap-10">
//     {timeLine.map((element, index) => {
//       const IconComponent = element.Logo;
//       return (
//         <div className="flex flex-row gap-6 items-start relative z-10" key={index}>
//           {/* Icon aligned exactly over the dotted line */}
//           <div className="w-[70px] h-[60px] flex items-center justify-center rounded-full bg-white shadow-md border-2 border-gray-300 relative z-10 ml-[6px]">
//             <IconComponent className={`text-2xl ${element.color}`} />
//           </div>

//           {/* Text beside icon */}
//           <div>
//             <h2 className="font-semibold text-[18px]">{element.heading}</h2>
//             <p className="text-base">{element.description}</p>
//           </div>
//         </div>
//       );
//     })}
//   </div>

//   <div className='relative shadow-blue-200'>
//     <img 
//     src={timeline}
//     alt='timelineimage'
//     className='shadow-white w-[600px] object-cover h-fit'/>

//     <div className='absolute bg-green-950 flex flex-row text-white uppercase py-10 left-[50%] translate-y-[-30%] translate-x-[-50%] mt-[-1px]'>
//         <div className='flex flex-row gap-5 items-center border-r border-green-700 px-8'>
//             <p className='text-3xl font-bold'>10</p>
//             <p className='text-green-400 text-sm'>Years of Experience</p>
//             </div>
        
//         <div className='flex flex-row gap-5 items-center  px-8'>
//             <p className='text-3xl font-bold'>250</p>
//             <p className='text-green-400 text-sm'>type of courses</p>

//         </div>
//     </div>
//     </div>


//   </div>

// </div>


//   );
// };

// export default TimeLineSection;

// import React from 'react'
// import { SlBadge } from "react-icons/sl";
// import { FaUserShield, FaHandsHelping,FaLightbulb } from "react-icons/fa";
// import timeline from '../../../assets/timeline.png'

// const timeLine = [
//  {
//     Logo: SlBadge,
//     heading: "Leadership",
//     description: "Fully committed to success company",
//     color: "text-red-500",
//   },
//   {
//     Logo: FaUserShield,
//     heading: "Responsibility",
//     description: "Takes ownership of tasks and outcomes",
//     color: "text-blue-500",
//   },
//   {
//     Logo: FaHandsHelping,
//     heading: "Flexibility",
//     description: "Adapts to changing circumstances with ease",
//     color: "text-green-500",
//   },
//   {
//     Logo: FaLightbulb,
//     heading: "Solve the Problem",
//     description: "Innovative thinker with practical solutions",
//     color: "text-yellow-500",
//   },

// ];

// // const TimeLineSection = () => {
// //   return (
// // <div>
// // <div className="flex flex-row gap-10 items-start relative w-full">
// //   {/* Vertical dotted line behind icons */}
// //   <div className="absolute left-[38px] top-6 bottom-6 w-0.5 border-l-2 border-dotted border-gray-400 z-0"></div>

// //   <div className="flex flex-col w-[45%] gap-10">
// //     {timeLine.map((element, index) => {
// //       const IconComponent = element.Logo;
// //       return (
// //         <div className="flex flex-row gap-6 items-start relative z-10" key={index}>
// //           {/* Icon aligned exactly over the dotted line */}
// //           <div className="w-[70px] h-[60px] flex items-center justify-center rounded-full bg-white shadow-md border-2 border-gray-300 relative z-10 ml-[6px]">
// //             <IconComponent className={`text-2xl ${element.color}`} />
// //           </div>

// //           {/* Text beside icon */}
// //           <div>
// //             <h2 className="font-semibold text-[18px]">{element.heading}</h2>
// //             <p className="text-base">{element.description}</p>
// //           </div>
// //         </div>
// //       );
// //     })}
// //   </div>

// //   <div className='relative shadow-blue-200'>
// //     <img 
// //     src={timeline}
// //     alt='timelineimage'
// //     className='shadow-white w-[600px] object-cover h-fit'/>

// //     <div className='absolute bg-green-950 flex flex-row text-white uppercase py-10 left-[50%] translate-y-[-30%] translate-x-[-50%] mt-[-1px]'>
// //         <div className='flex flex-row gap-5 items-center border-r border-green-700 px-8'>
// //             <p className='text-3xl font-bold'>10</p>
// //             <p className='text-green-400 text-sm'>Years of Experience</p>
// //             </div>
        
// //         <div className='flex flex-row gap-5 items-center  px-8'>
// //             <p className='text-3xl font-bold'>250</p>
// //             <p className='text-green-400 text-sm'>type of courses</p>

// //         </div>
// //     </div>
// //     </div>


// //   </div>

// // </div>


// //   );
// // };

// // export default TimeLineSection;


// import React from 'react'
// import { SlBadge } from "react-icons/sl";
// import { FaUserShield, FaHandsHelping, FaLightbulb } from "react-icons/fa";
// import timeline from '../../../assets/timeline.png'

// // Re-introducing the color property to the data array
// const timeLine = [
//  {
//     Logo: SlBadge,
//     heading: "Leadership",
//     description: "Fully committed to success company",
//     color: "text-red-500", // Example color
//   },
//   {
//     Logo: FaUserShield,
//     heading: "Responsibility",
//     description: "Takes ownership of tasks and outcomes",
//     color: "text-blue-500", // Example color
//   },
//   {
//     Logo: FaHandsHelping,
//     heading: "Flexibility",
//     description: "Adapts to changing circumstances with ease",
//     color: "text-green-500", // Example color
//   },
//   {
//     Logo: FaLightbulb,
//     heading: "Solve the Problem",
//     description: "Innovative thinker with practical solutions",
//     color: "text-yellow-500", // Example color
//   },
// ];

// const TimeLineSection = () => {
//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row gap-20 items-center">
        
//         {/* Left Side: Animated Timeline Items */}
//         <div className="lg:w-[45%] flex flex-col gap-14 relative">
//           {/* Vertical dotted line */}
//           <div className="absolute left-[28px] top-0 h-full w-0.5 border-l-2 border-dotted border-warm-stone z-0"></div>

//           {timeLine.map((element, index) => {
//             const IconComponent = element.Logo;
//             const isEven = index % 2 === 0;

//             return (
//               // --- UPDATED ANIMATION LOGIC ---
//               // Each item starts invisible (opacity-0)
//               // We conditionally apply 'animate-fadeIn-left' or 'animate-fadeIn-right'
//               <div 
//                 className={`
//                   flex flex-row gap-6 items-center relative z-10 opacity-0
//                   ${isEven ? 'animate-fadeIn-left' : 'animate-fadeIn-right'}
//                 `}
//                 // Staggered delay remains the same for a nice cascading effect
//                 style={{ animationDelay: `${index * 200}ms` }}
//                 key={index}
//               >
//                 {/* Icon Circle with Hover Effect */}
//                 <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-soft-terracotta shadow-lg border-2 border-white 
//                               transition-all duration-300 group-hover:scale-110">
//                   {/* The icon now uses the dynamic color from the data */}
//                   <IconComponent className={`text-2xl ${element.color}`} />
//                 </div>

//                 {/* Text with Hover Effect */}
//                 <div className="transition-all duration-300 group-hover:translate-x-2">
//                   <h2 className="font-semibold text-[18px] text-espresso-brown">{element.heading}</h2>
//                   <p className="text-base text-espresso-brown/80">{element.description}</p>
//                 </div>
//               </div>
//               // --- END UPDATE ---
//             );
//           })}
//         </div>

//         {/* Right Side: Image and Stats Card - Animates in from the right */}
//         <div className='relative shadow-lg lg:w-[55%] opacity-0 animate-fadeIn-right' style={{ animationDelay: '800ms' }}>
//           <img 
//             src={timeline}
//             alt='timelineimage'
//             className='shadow-2xl shadow-burnt-sienna/20 object-cover h-fit rounded-lg'
//           />
//           <div className='absolute bg-espresso-brown flex flex-col lg:flex-row text-white uppercase py-7
//                           left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-2xl'>
//             {/* ... stats card content ... */}
//                  <div className='absolute bg-rose-950 flex flex-row text-white uppercase py-10 left-[50%] translate-y-[-30%] translate-x-[-50%] mt-[-1px] hover:scale-110 transition-all duration-300 shadow-lg'>
//          <div className='flex flex-row gap-5 items-center border-r border-green-700 px-8'>
//              <p className='text-3xl font-bold'>10</p>
//              <p className='text-green-400 text-sm'>Years of Experience</p>
//              </div>
   
//          <div className='flex flex-row gap-5 items-center  px-8'>
//              <p className='text-3xl font-bold'>250</p>
//              <p className='text-green-400 text-sm'>type of courses</p>
//          </div>
//      </div>
//      </div>
//           </div>
//         </div>
//       </div>
 
//   );
// };

// export default TimeLineSection;