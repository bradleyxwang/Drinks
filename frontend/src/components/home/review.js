import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cocktailLookup } from "../../actions/api-actions";
import { renderDateStr } from "../../utils/date";

import Card from "./card";
import StarReview from "../star-scale/review";
import Comment from "../review/comment";

const RecentReview = ({ profile, review }) => {
  const drinkDetails = useSelector((state) => state.api.details);
  const [detailedReview, setDetailedReview] = useState(review);
  const [cardInfo, setCardInfo] = useState({
    headerLink: "",
    headerText: "",
    body: "",
    footer: "",
  });

  const dispatch = useDispatch();

  const fetchDetails = useCallback(async () => {
    const lookupString = `i=${review.drinkId}`;
    await cocktailLookup(dispatch, lookupString).catch((e) => alert(e));
  }, [dispatch, review.drinkId]);

  useEffect(() => {
    if (drinkDetails && parseInt(drinkDetails.id) === review.drinkId) {
      setDetailedReview({ ...review, ...drinkDetails });
    }
  }, [drinkDetails, review]);

  useEffect(() => {
    setCardInfo({
      headerLink: `/details/${detailedReview.drinkId}`,
      headerText: detailedReview.name,
      body: <div><StarReview score={detailedReview.score} /></div>,
      footer: `${renderDateStr(detailedReview.date)}`,
    });
  }, [detailedReview]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className="col-4">
      <Card {...cardInfo} />
    </div>
  );
};

export default RecentReview;
