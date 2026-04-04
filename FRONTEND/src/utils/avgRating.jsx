export default function GetAvgRating(ratingAndReviews) {

  if (!ratingAndReviews || ratingAndReviews.length === 0) {
    return 0;
  }
  

  const totalReviewCount = ratingAndReviews.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const avgRating = totalReviewCount / ratingAndReviews.length;
  
  return avgRating;
}