import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { cocktailLookup } from "../../actions/api-actions";
import { renderDateStr } from "../../utils/date";

import StarRating from "../star-scale/rating";
import Review from "../review/review";

const ReviewItem = ({ profile, review }) => {
  const drinkDetails = useSelector((state) => state.api.details);
  const [details, setDetails] = useState();

  const dispatch = useDispatch();

  const fetchDetails = useCallback(async () => {
    const lookupString = `i=${review.drinkId}`;
    await cocktailLookup(dispatch, lookupString).catch((e) => alert(e));
  }, [dispatch, review.drinkId]);

  useEffect(() => {
    if (drinkDetails && parseInt(drinkDetails.id) === review.drinkId) {
      setDetails(drinkDetails);
    }
  }, [drinkDetails, review.drinkId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const renderItem = () => {
    return (
      <div className="col-xl-3 col-lg-4 col-md-6 col-xs-12 d-xs-flex mb-4">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0 d-inline d-xl-none">{details.name}</h4>
            <h5 className="mb-0 d-none d-xl-inline">{details.name}</h5>
              <h4 className="mb-0 d-inline d-xl-none float-end">
                <i className="fas fa-cocktail"></i>
              </h4>
              <h5 className="mb-0 d-none d-xl-inline float-end">
                <i className="fas fa-cocktail"></i>
              </h5>
          </div>
          <Link to={`/details/${review.drinkId}`} state={{ fromSearch: false }}>
            <img
              className="card-img-top"
              src={details.image}
              alt={`${details.name} drink`}
            />
          </Link>
          <div className="card-body text-center">
            <Link
              to={`/details/${review.drinkId}`}
              state={{ fromSearch: false }}
              className="btn btn-info w-100"
            >
              Details
            </Link>
          </div>
          <div className="card-footer bg-transparent text-center">
            <div className="d-block">
              <StarRating drink={details} profile={profile} />
              <Review drink={details} profile={profile} />
            </div>
            <h6 className="mt-2">{renderDateStr(review.date)}</h6>
          </div>
        </div>
      </div>
    );
  };

  return <>{details ? renderItem() : <></>}</>;
};

export default ReviewItem;
