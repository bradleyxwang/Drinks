import React from "react";

const StarReview = ({ score }) => {
  const renderStar = (pos, lit) => {
    const style = lit ? "fas text-warning" : "far text-muted";
    return <i key={pos} className={`${style} fa-star fa-lg px-1`}></i>;
  };

  return [1, 2, 3, 4, 5].map((i) => renderStar(i, i <= score));
};

export default StarReview;
