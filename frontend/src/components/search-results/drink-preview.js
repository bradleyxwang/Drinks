import React from "react";
import { Link } from "react-router-dom";

import StarRating from "../star-scale/rating";
import Review from "../review/review.js"

const DrinkPreview = ({ drink, profile }) => {
  return (
    <div className="col-lg-2 col-md-3 mb-4">
      <div className="card">
        <div className="card-header bg-light">
          <h8 className="mb-0 d-inline">{drink.name}</h8>
        </div>
        <Link to={`/details/${drink.id}`} state={{ fromSearch: true }}>
          <img
            className="card-img-top"
            src={drink.image}
            alt={`${drink.name} drink`}
          />
        </Link>
      </div>
    </div>
  );
};

export default DrinkPreview;
