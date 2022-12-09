import mongoose from "mongoose";

const ratingsSchema = mongoose.Schema(
  {
    drinkId: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "ratings" }
);

export const ratingsModel = mongoose.model("RatingModel", ratingsSchema);

export const findUserDrinkRating = (userId, drinkId) =>
  ratingsModel.findOne({ userId: userId, drinkId: drinkId });
export const findAllUserRatings = (userId) =>
  ratingsModel.find({ userId: userId }).sort({ date: -1 });
export const findAllDrinkRatings = (drinkId) =>
  ratingsModel.find({ drinkId: drinkId }).sort({ date: -1 });

export const updateRating = (userId, drinkId, newRating) =>
  ratingsModel.updateOne(
    { userId: userId, drinkId: drinkId },
    { $set: { score: newRating, date: new Date() } },
    { upsert: true }
  );

export const findMostOccurringUsers = () =>
  ratingsModel.aggregate([
    { $group: { _id: "$userId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 3 },
  ]);

export const findMostRecentReviews = (userId) =>
  ratingsModel.find({ userId: userId }).sort({ date: -1 }).limit(3);
