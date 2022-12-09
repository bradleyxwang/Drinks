import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { getAllUserRatings } from "../../services/ratings-service";

import ReviewItem from "./review-item";

const ReviewedDrinks = ({ profile }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = useCallback(async () => {
    const response = await getAllUserRatings(profile._id);
    if (response) {
      setReviews(response);
    }
  }, [profile._id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const renderReviewedItems = () => {
    return reviews.map((review) => (
      <ReviewItem key={review.drinkId} review={review} profile={profile} />
    ));
  };

  return (
    <div className="row">
      {reviews.length > 0 ? (
        renderReviewedItems()
      ) : (
        <h6>
          No drinks reviews found. Search for drinks <Link to="/">here</Link>!
        </h6>
      )}
    </div>
  );
};

export default ReviewedDrinks;
