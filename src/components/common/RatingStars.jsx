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
    // --- THIS IS THE GUARANTEED FIX FOR HALF-STAR LOGIC ---
    // 1. Ensure the review count is a number.
    const rating = Number(Review_Count) || 0;

    // 2. Round the rating to the nearest half-star (e.g., 4.7 becomes 4.5, 4.2 becomes 4.0).
    // This is the standard and most robust way to handle star ratings.
    const roundedRating = Math.round(rating * 2) / 2;

    // 3. Calculate the number of full, half, and empty stars based on the rounded value.
    const fullStars = Math.floor(roundedRating);
    const halfStars = roundedRating % 1 !== 0 ? 1 : 0; // If there's a decimal, it must be 0.5
    const emptyStars = 5 - fullStars - halfStars;

    SetStarCount({
      full: fullStars,
      half: halfStars,
      empty: emptyStars,
    })
  }, [Review_Count])
  // --- END OF FIX ---

  return (
    <div className="flex gap-1 text-golden-sunshine">
      {/* Render Full Stars */}
      {[...new Array(starCount.full)].map((_, i) => {
        return <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
      })}
      
      {/* Render Half Stars */}
      {[...new Array(starCount.half)].map((_, i) => {
        return <TiStarHalfOutline key={`half-${i}`} size={Star_Size || 20} />
      })}
      
      {/* Render Empty Stars */}
      {[...new Array(starCount.empty)].map((_, i) => {
        return <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} className="text-warm-stone/50" />
      })}
    </div>
  )
}

export default RatingStars