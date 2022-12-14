import * as reviewsModel from "../models/reviews.js";

const reviewsController = (app) => {
  app.get("/api/reviews/:uid/:did", findUserDrinkReview);
  app.delete("/api/deletereview/:uid/:did", deleteUserDrinkReview);
  app.get("/api/reviews/:id", findAllReviews);
  app.put("/api/reviews", updateReview);
  app.get("/api/reviews/mostOccurringUsers", findMostOccurringUsers);
  app.get("/api/recent_reviews/:uid", findMostRecentReviews);
};

const findUserDrinkReview = async (req, res) => {
  const userId = req.params.uid;
  const drinkId = req.params.did;
  const review = await reviewsModel.findUserDrinkReview(userId, drinkId);
  res.json(review);
};

const deleteUserDrinkReview = async (req, res) => {
  const userId = req.params.uid;
  const drinkId = req.params.did;
  const status = await reviewsModel.deleteUserDrinkReview(userId, drinkId);
  res.json(status);
};

const findAllReviews = async (req, res) => {
  const id = req.params.id;
  let reviews;
  if (isNaN(id)) {
    reviews = await reviewsModel.findAllUserReviews(id);
  } else {
    reviews = await reviewsModel.findAllDrinkReviews(id);
  }
  res.json(reviews);
};

const updateReview = async (req, res) => {
  const review = req.body;
  const userId = review.userId;
  const drinkId = review.drinkId;
  const updatedComment = review.comment;
  const status = await reviewsModel.updateReview(userId, drinkId, updatedComment);
  res.json(status);
};

const findMostOccurringUsers = async (req, res) => {
  const users = await reviewsModel.findMostOccurringUsers();
  res.json(users);
};

const findMostRecentReviews = async (req, res) => {
  const userId = req.params.uid;
  const reviews = await reviewsModel.findMostRecentReviews(userId);
  res.json(reviews);
};

export default reviewsController;
