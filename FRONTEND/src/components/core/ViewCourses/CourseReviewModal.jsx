
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"


import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()


  const [rating, setRating] = useState(0)

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    setRating(0) 
  }, [])

  
  const handleRatingChange = (newRating) => {
    if (newRating === 0) return;
    setRating(newRating)
    setValue("courseRating", newRating) 
  }

  const onSubmit = async (data) => {
    if (data.courseRating === 0) {
      alert("Please provide a star rating by clicking on a star.");
      return;
    }
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  
  const myStyles = {
    itemShapes: Star,
    activeFillColor: '#FFC700', 
    inactiveFillColor: 'rgba(74, 63, 53, 0.3)' 
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-espresso-brown/50 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-warm-stone/20 bg-soft-terracotta text-espresso-brown shadow-2xl">
        
       
        <div className="flex items-center justify-between rounded-t-lg bg-warm-stone/10 p-5">
          <p className="text-xl font-semibold">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-espresso-brown/80 hover:text-espresso-brown" />
          </button>
        </div>
        
        
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image ? user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
              alt={`${user?.firstName} profile`}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-espresso-brown/80">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            
            <Rating
              value={rating} 
              onChange={handleRatingChange}
              style={{ maxWidth: 200 }}
              itemStyles={myStyles}
              isRequired
            />
            
           
            <div className="flex w-full flex-col space-y-2 mt-4">
              <label className="text-sm text-espresso-brown" htmlFor="courseExperience">
                Add Your Experience <sup className="text-pink-400">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your thoughts about the course..."
                {...register("courseExperience", { required: true })}
                className="w-full mt-2 p-3 min-h-[130px] resize-none rounded-lg bg-warm-stone/10 border border-warm-stone/50 placeholder:text-warm-stone focus:outline-none focus:ring-2 focus:ring-burnt-sienna"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-400">
                  Please share your experience.
                </span>
              )}
            </div>

            
            <div className="mt-6 flex w-full justify-end gap-x-4">
              <IconBtn
                onClick={() => setReviewModal(false)}
                text="Cancel"
                outline={true}
              />
              <IconBtn 
                text="Save"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}