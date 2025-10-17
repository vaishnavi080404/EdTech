import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/CartSlice';

// 1. IMPORT THE NEW RATING COMPONENT AND ITS REQUIRED CSS
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

// 2. IMPORT YOUR AVERAGE RATING UTILITY
import GetAvgRating from '../../../../utils/avgRating';

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 3. DEFINE THE CUSTOM STYLES FOR THE STARS
  const myStyles = {
    itemShapes: Star,
    activeFillColor: '#FFC700', // your 'golden-sunshine' color
    inactiveFillColor: 'rgba(74, 63, 53, 0.3)', // your semi-transparent 'espresso-brown'
    itemStrokeWidth: 1,
    activeStrokeColor: '#FFC700',
    inactiveStrokeColor: 'rgba(74, 63, 53, 0.3)',
  };

  return (
    <div className="flex flex-1 flex-col p-5">
      {cart.map((course, indx) => {
        // Calculate the average rating for each course
        const avgReviewCount = GetAvgRating(course.ratingAndReviews);
        
        return (
          <div
            key={course._id}
            className={`flex w-full flex-col sm:flex-row flex-wrap items-start justify-between gap-6 ${
              indx !== cart.length - 1 && "border-b border-warm-stone/20 pb-6"
            } ${indx !== 0 && "mt-6"} `}
          >
            <div className="flex flex-1 flex-col gap-4 xl:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col space-y-1">
                <p className="text-lg font-medium text-espresso-brown">
                  {course?.courseName}
                </p>
                <p className="text-sm text-warm-stone">
                  {course?.category?.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-golden-sunshine">{avgReviewCount || 0}</span>
                  {/* --- 4. USE THE NEW, RELIABLE RATING COMPONENT --- */}
                  <Rating
                    value={avgReviewCount}
                    readOnly={true}
                    style={{ maxWidth: 110 }}
                    itemStyles={myStyles}
                  />
                  <span className="text-mid-gray">
                    ({course?.ratingAndReviews?.length} Ratings)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end space-y-2">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-x-1 rounded-md border border-rose-gold/50 bg-rose-gold/10 py-2 px-4 text-rose-gold transition-all duration-200 hover:bg-rose-gold/20"
              >
                <RiDeleteBin6Line className='text-red-900' />
                <span className='text-red-950'  >Remove</span>
              </button>
              <p className="mb-6 text-2xl font-semibold text-mid-gray">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}