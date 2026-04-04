import React, { useEffect, useState } from "react"
import Img from './Img'; 

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/autoplay"


import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

// API Imports
import { apiConnector } from "../../services/operations/apiconnector";
import { ratingsEndpoints } from "../../services/operations/apis"


export default function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const truncateWords = 15

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); 
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.error("Could not fetch reviews.", error);
      }
      setLoading(false);
    }
    fetchReviews()
  }, [])


  const myStyles = {
    itemShapes: Star,
    activeFillColor: '#FFC700', 
    inactiveFillColor: 'rgba(255, 241, 240, 0.3)'
  }

  if (loading) {
    return (
      <div className="grid min-h-[184px] place-items-center">
        loading
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="grid min-h-[184px] place-items-center">
        <p className="text-xl text-espresso-brown/70">No reviews have been added yet.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="my-12 max-w-maxContent mx-auto">
        <Swiper
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          loop={reviews.length > 3}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full review-slider"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-full flex-col gap-3 bg-espresso-brown/80 p-4 text-sm text-soft-terracotta
                              rounded-xl border border-warm-stone/20 backdrop-blur-lg shadow-lg">
                
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Img
                    src={
                      review?.user?.image
                        ? review.user.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="profile pic"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-soft-terracotta capitalize">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h3>
                    <h4 className="text-xs font-medium text-soft-terracotta/70">
                      {review?.course?.courseName}
                    </h4>
                  </div>
                </div>

                {/* review text */}
                <p className="font-medium text-soft-terracotta/90 flex-grow">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review.review.split(" ").slice(0, truncateWords).join(" ")}...`
                    : review.review}
                </p>

                {/* rating */}
                <div className="flex items-center gap-2 mt-auto">
                  <h3 className="font-semibold text-golden-sunshine">
                    {review.rating.toFixed(1)}
                  </h3>
                 
                  <Rating
                    value={review.rating}
                    readOnly={true}
                    style={{ maxWidth: 100 }}
                    itemStyles={myStyles} 
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}