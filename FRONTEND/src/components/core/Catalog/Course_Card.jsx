import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
import { useState } from 'react'
import RatingStars from '../../common/RatingStars'

const Course_Card = ({course , Height}) => {

    const [avgReviewCount , setAvgReviewCount ]= useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }),[course]

     console.log("Course object in Card:", course);



  return (
    <Link to={`/courses/${course._id}`}>
      
      <div className="group rounded-xl overflow-hidden 
                      bg-espresso-brown/20 border-2 border-warm-stone/20 backdrop-blur-lg 
                      shadow-lg transition-all duration-300
                      hover:shadow-2xl hover:border-warm-stone/40 hover:-translate-y-2 ">
        
   
        <div className="overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={`${course?.courseName} thumbnail`}
            className={`${Height || 'h-[30px]'} w-full object-cover 
                       transition-transform duration-300 group-hover:scale-105`}
          />
        </div>

  
        <div className="flex flex-col gap-2 p-4">
          <p className="text-xl font-bold text-espresso-brown leading-tight">
            {course?.courseName}
          </p>
          <p className="text-sm text-espresso-brown/80">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          
         
          <div className="flex items-center gap-2">
            
            <span className="font-semibold text-golden-sunshine">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-warm-stone">
              ({course?.ratingAndReviews?.length} Ratings)
            </span>
          </div>

       
          <p className="text-xl font-semibold text-espresso-brown">
            ₹ {course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card;