import React from "react";
import { Link } from "react-router-dom";
import { renderDateStr } from "../../utils/date";

import StarReview from "../star-scale/review";
import Comment from "../review/comment";
import {
  deleteUserDrinkReview,
  getUserDrinkReview
} from "../../services/reviews-service";

const DrinkComment = ({ comment, isAuthor, userId, drinkId }) => {

  const deleteReview = async (userId, drinkId) => {
    console.log("HHH")
    const response = await deleteUserDrinkReview(userId, drinkId);

  };

  return (
      <div className="col-lg-3 col-md-4 col-6">
        <div className="card bg-secondary">
          <div className="card-header bg-dark">

              <div class="row">
                <div className="col-10">
                  <Link to={`/profile/${comment.userId}`} className="card-link">
                    <h5 className="mb-0">{comment.userFullName}</h5>
                  </Link>
                </div>

                <div className="col-2">
                  {isAuthor ? <i className="fas fa-trash float-end lh-base"
                    onClick={(e) => {
                      deleteReview(userId, drinkId).then(r => {window.location.reload()})
                      //
                    }}
                  ></i> : ""}

                </div>


              </div>

          </div>
          <div className="card-body text-center">
            <div className="d-block">
              <Comment comment={comment.comment} />
            </div>
          </div>
          <div className="card-footer bg-transparent text-center">
            <h6 className="mb-0">{renderDateStr(comment.date)}</h6>
          </div>
        </div>
      </div>
  );
};

export default DrinkComment;
