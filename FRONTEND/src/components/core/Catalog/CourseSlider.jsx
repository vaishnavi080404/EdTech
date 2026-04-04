import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"


import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"


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
            
            768: {
              slidesPerView: 2,
            },
            
            1024: {
              slidesPerView: 3,
            },
          }}
          
          className="my-swiper"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
       
        <div className="grid h-[20vh] w-full place-content-center">
          <p className="text-xl text-espresso-brown/70">No Courses Found</p>
        </div>
      )}
    </>
  )
}
  
export default CourseSlider