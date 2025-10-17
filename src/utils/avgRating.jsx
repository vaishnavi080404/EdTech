export default function GetAvgRating(ratingAndReviews) {
  // --- THIS IS THE FIX ---
  // If the reviews array is empty or doesn't exist, return 0 immediately.
  if (!ratingAndReviews || ratingAndReviews.length === 0) {
    return 0;
  }
  // --- END OF FIX ---

  const totalReviewCount = ratingAndReviews.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const avgRating = totalReviewCount / ratingAndReviews.length;
  
  return avgRating;
}