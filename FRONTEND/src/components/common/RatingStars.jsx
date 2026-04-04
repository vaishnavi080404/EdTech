import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    
    const rating = Number(Review_Count) || 0;

    const roundedRating = Math.round(rating * 2) / 2;

    
    const fullStars = Math.floor(roundedRating);
    const halfStars = roundedRating % 1 !== 0 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStars;

    SetStarCount({
      full: fullStars,
      half: halfStars,
      empty: emptyStars,
    })
  }, [Review_Count])


  return (
    <div className="flex gap-1 text-golden-sunshine">
   
      {[...new Array(starCount.full)].map((_, i) => {
        return <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
      })}
      
    
      {[...new Array(starCount.half)].map((_, i) => {
        return <TiStarHalfOutline key={`half-${i}`} size={Star_Size || 20} />
      })}
      
 
      {[...new Array(starCount.empty)].map((_, i) => {
        return <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} className="text-warm-stone/50" />
      })}
    </div>
  )
}

export default RatingStars