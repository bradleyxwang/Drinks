import mongoose from "mongoose";

const favoriteDrinksSchema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      drinkId: {
        type: Number,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      drinkName: {
        type: String,
        required: true,
      }
    },
    { collection: "favorite-drinks" }
);

export const reviewsModel = mongoose.model("FavoriteDrinkModel", favoriteDrinksSchema);

export const findFavoriteDrinks = (userId) =>
    reviewsModel.find({ userId: userId });

export const findBartenders = (drinkId) =>
    reviewsModel.find({ drinkId: drinkId });

export const addFavoriteDrink = (userId, drinkId, fullName, drinkName) =>
    reviewsModel.create({ userId: userId, drinkId: drinkId, fullName: fullName, drinkName: drinkName});

export const deleteFavoriteDrink = (userId, drinkId) =>
    reviewsModel.deleteMany({ userId: userId, drinkId: drinkId});

export const favoriteDrinkExists = (userId, drinkId) =>
    reviewsModel.find({ userId: userId, drinkId: drinkId});