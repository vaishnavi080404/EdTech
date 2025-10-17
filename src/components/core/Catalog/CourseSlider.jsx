// import React from 'react'
// import { Swiper, SwiperSlide } from "swiper/react"

// // Import Swiper styles for core, pagination, and navigation
// import "swiper/css"
// import "swiper/css/pagination"
// import "swiper/css/navigation"

// // Import required modules from the correct path
// import { Autoplay, FreeMode, Navigation, Pagination }  from 'swiper/modules'

// import Course_Card from './Course_Card'

// const CourseSlider = ({ Courses }) => {
//     return (
//       <>
//         {Courses?.length ? (
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={25}
//             // --- THIS IS THE FIX FOR THE WARNING ---
//             // Only enable the loop if there are enough courses to make it worthwhile.
//             // We set it to true only if you have more courses than the largest slidesPerView value.
//             loop={Courses.length > 3}
//             // --- END OF FIX ---
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             pagination={{
//               clickable: true,
//             }}
//             navigation={true}
//             modules={[FreeMode, Pagination, Autoplay, Navigation]}
//             breakpoints={{
//               1024: {
//                 slidesPerView: 3,
//               },
//             }}
//             className="max-h-[30rem]"
//           >
//             {Courses?.map((course, i) => (
//               <SwiperSlide key={i}>
//                 <Course_Card course={course} Height={"h-[215px]"} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <p className="text-xl text-richblack-5">No Course Found</p>
//         )}
//       </>
//     )
//   }
  
//   export default CourseSlider

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Import required modules
import { Autoplay, FreeMode, Navigation, Pagination }  from 'swiper/modules'

import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={Courses.length > 3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          breakpoints={{
            // Show 2 cards on medium screens
            768: {
              slidesPerView: 2,
            },
            // Show 3 cards on large screens
            1024: {
              slidesPerView: 3,
            },
          }}
          // --- APPLY THE CUSTOM CLASS HERE ---
          className="my-swiper"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Styled "No Course Found" message
        <div className="grid h-[20vh] w-full place-content-center">
          <p className="text-xl text-espresso-brown/70">No Courses Found</p>
        </div>
      )}
    </>
  )
}
  
export default CourseSlider