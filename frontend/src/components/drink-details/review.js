import React from "react";
import { Link } from "react-router-dom";
import { renderDateStr } from "../../utils/date";

import StarReview from "../star-scale/review";
import Comment from "../review/comment";

const DrinkReview = ({ review }) => {
  return (
    <div className="col-lg-3 col-md-4 col-6">
      <div className="card bg-dark">
        <div className="card-header bg-dark">
          <Link to={`/profile/${review.userId}`} className="card-link">
            <h5 className="mb-0">{review.userFullName}</h5>
          </Link>
        </div>
        <div className="card-body text-center">
          <div className="d-block">
            <StarReview score={review.score} />
            <Comment comment={review.comment} />
          </div>
        </div>
        <div className="card-footer bg-transparent text-center">
          <h6 className="mb-0">{renderDateStr(review.date)}</h6>
        </div>
      </div>
    </div>
  );
};

export default DrinkReview;
