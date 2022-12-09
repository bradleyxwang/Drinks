import React, { useState, useEffect } from "react";

import {
  getUserDrinkReview,
  updateReview,
} from "../../services/reviews-service";

import { getAge } from "../../utils/date";

const Review = ({ drink, profile }) => {
  const [review, setReview] = useState({
    userId: profile._id,
    drinkId: drink.id,
    review: "Default review here",
  });
  const [age, setAge] = useState(-1);

  const fetchReview = async () => {
    if (profile) {
      const response = await getUserDrinkReview(profile._id, drink.id);
      if (response) {
        setReview({ ...review, comment: response.comment });
      }
    }
  };

  const handleReviewChange = async (comment) => {
    if (comment !== review.comment) {
      const newReview = { ...review, comment };
      setReview(newReview);
      await updateReview(newReview);
    }
  };

  useEffect(() => {
    fetchReview();
  });

  useEffect(() => {
    setAge(getAge(profile.dob));
  }, [profile.dob]);

  return (
      <div className="form-floating mb-3">
        <input
            type="comment"
            className="form-control form-control-lg"
            id="comment"
            placeholder="Write your review here!"
        />
        <label htmlFor="comment">Write your review here!</label>
        <button onClick={(e) => {

          handleReviewChange(document.getElementById("comment").value)
          window.location.reload()
        }
        }>Save</button>
      </div>
  );
};

export default Review;
