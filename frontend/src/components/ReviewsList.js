import React from "react";
import Review from './Review';


function ReviewList({ Reviews }) {

  const reviews = Reviews.reviews.map(review =>  <Review key={review["id"]} review={review} />);
   
  return (
    <div>
      {reviews}
    </div>
  );
}

export default ReviewList;