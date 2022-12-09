import React, { useState, useEffect } from "react";

import {
  getUserDrinkRating,
  updateRating,
} from "../../services/ratings-service";

import { getAge } from "../../utils/date";

const StarRating = ({ drink, profile }) => {
  const [rating, setRating] = useState({
    userId: profile._id,
    drinkId: drink.id,
    score: 0,
  });
  const [age, setAge] = useState(-1);

  const fetchRating = async () => {
    if (profile) {
      const response = await getUserDrinkRating(profile._id, drink.id);
      if (response) {
        setRating({ ...rating, score: response.score });
      }
    }
  };

  const handleRatingChange = async (score) => {
    if (score !== rating.score) {
      const newRating = { ...rating, score };
      setRating(newRating);
      await updateRating(newRating);
    }
  };

  useEffect(() => {
    fetchRating();
  });

  useEffect(() => {
    setAge(getAge(profile.dob));
  }, [profile.dob]);

  const renderStar = (pos, lit) => {
    const style = lit ? "fas text-warning" : "far text-muted";
    const isDisabled =
      age < 21 && drink.alcoholic === "Alcoholic" ? "disabled" : "";
    const tooltip = isDisabled ? "Must be 21 to rate alcoholic cocktails" : "";
    const pointerEvents = isDisabled ? "none" : "all";

    return (
      <span
        key={pos}
        className="d-inline-block"
        tabIndex="0"
        data-toggle="tooltip"
        title={tooltip}
      >
        <i
          className={`${style} fa-star fa-2x px-1 ${isDisabled}`}
          role="button"
          style={{ pointerEvents }}
          onClick={() => handleRatingChange(pos)}
        ></i>
      </span>
    );
  };

  return [1, 2, 3, 4, 5].map((i) => renderStar(i, i <= rating.score));
};

export default StarRating;
