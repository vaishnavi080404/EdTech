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


//     return (
//     <Link to={`/courses/${course._id}`}>
//       <div>
//         <div className="rounded-lg">
//           {/* --- THIS IS THE FIX --- */}
//           {/* Ensure the src attribute is correctly set to course.thumbnail */}
//           <img
//             src={course?.thumbnail}
//             alt={`${course?.courseName} thumbnail`}
//             className={`${Height} w-full rounded-xl object-cover`}
//           />
//           {/* --- END OF FIX --- */}
//         </div>
//         <div className="flex flex-col gap-2 px-1 py-3">
//           <p className="text-xl text-richblack-5">{course?.courseName}</p>
//           <p className="text-sm text-richblack-50">
//             {course?.instructor?.firstName} {course?.instructor?.lastName}
//           </p>
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-5">{avgReviewCount || 0}</span>
//             <RatingStars Review_Count={avgReviewCount} />
//             <span className="text-richblack-400">
//               {course?.ratingAndReviews?.length} Ratings
//             </span>
//           </div>
//           <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default Course_Card

  return (
    <Link to={`/courses/${course._id}`}>
      {/* --- STYLED GLASSMORPHISM CARD --- */}
      {/* The 'group' class is essential for the image zoom effect on hover */}
      <div className="group rounded-xl overflow-hidden 
                      bg-espresso-brown/20 border-2 border-warm-stone/20 backdrop-blur-lg 
                      shadow-lg transition-all duration-300
                      hover:shadow-2xl hover:border-warm-stone/40 hover:-translate-y-2 ">
        
        {/* Thumbnail with Hover Effect */}
        <div className="overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={`${course?.courseName} thumbnail`}
            className={`${Height || 'h-[30px]'} w-full object-cover 
                       transition-transform duration-300 group-hover:scale-105`}
          />
        </div>

        {/* --- STYLED CARD CONTENT --- */}
        <div className="flex flex-col gap-2 p-4">
          <p className="text-xl font-bold text-espresso-brown leading-tight">
            {course?.courseName}
          </p>
          <p className="text-sm text-espresso-brown/80">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          
          {/* Rating Section */}
          <div className="flex items-center gap-2">
            {/* Using golden-sunshine for the rating number for a bright accent */}
            <span className="font-semibold text-golden-sunshine">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-warm-stone">
              ({course?.ratingAndReviews?.length} Ratings)
            </span>
          </div>

          {/* Price */}
          <p className="text-xl font-semibold text-espresso-brown">
            ₹ {course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card;