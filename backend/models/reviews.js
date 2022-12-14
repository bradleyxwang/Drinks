import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
    {
      drinkId: {
        type: Number,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    { collection: "reviews" }
);

export const reviewsModel = mongoose.model("ReviewModel", reviewsSchema);

export const findUserDrinkReview = (userId, drinkId) =>
    reviewsModel.findOne({ userId: userId, drinkId: drinkId });
export const deleteUserDrinkReview = (userId, drinkId) =>
    reviewsModel.deleteMany({ userId: userId, drinkId: drinkId });
export const findAllUserReviews = (userId) =>
    reviewsModel.find({ userId: userId }).sort({ date: -1 });
export const findAllDrinkReviews = (drinkId) =>
    reviewsModel.find({ drinkId: drinkId }).sort({ date: -1 });

export const updateReview = (userId, drinkId, newReview) =>
    reviewsModel.updateOne(
        { userId: userId, drinkId: drinkId },
        { $set: { comment: newReview, date: new Date() } },
        { upsert: true }
    );

export const findMostOccurringUsers = () =>
    reviewsModel.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]);

export const findMostRecentReviews = (userId) =>
    reviewsModel.find({ userId: userId }).sort({ date: -1 }).limit(3);
