import * as favoriteDrinksModel from "../models/favorite-drinks.js";

const favoriteDrinksController = (app) => {
  app.get("/api/favorite/drinks/:uid", findFavoriteDrinks);
  app.get("/api/favorite/bartenders/:did", findBartenders);
  app.post("/api/favorite/drinks/new/:uid/:did", addFavoriteDrink);
  app.delete("/api/favorite/drinks/delete/:uid/:did", deleteFavoriteDrink);
  app.get("/api/favorite/drinks/exists/:uid/:did", favoriteDrinkExists);
};

const findFavoriteDrinks = async (req, res) => {
  const userId = req.params.uid;
  const favoriteDrinks = await favoriteDrinksModel.findFavoriteDrinks(userId);
  res.json(favoriteDrinks);
};

const addFavoriteDrink = async (req, res) => {
  const userId = req.params.uid;
  const drinkId = req.params.did;
  const fullName = req.body.fullName;
  const drinkName = req.body.drinkName;
  const response = await favoriteDrinksModel.addFavoriteDrink(userId, drinkId, fullName, drinkName);
  res.json(response);
};

const deleteFavoriteDrink = async (req, res) => {
  const userId = req.params.uid;
  const drinkId = req.params.did;
  const response = await favoriteDrinksModel.deleteFavoriteDrink(userId, drinkId);
  res.json(response);
};

const favoriteDrinkExists = async (req, res) => {
  const userId = req.params.uid;
  const drinkId = req.params.did;
  const response = await favoriteDrinksModel.favoriteDrinkExists(userId, drinkId);
  res.json(response);
};

const findBartenders = async (req, res) => {
  const drinkId = req.params.did;
  const favoriteBartenders = await favoriteDrinksModel.findBartenders(drinkId);
  res.json(favoriteBartenders);
};

export default favoriteDrinksController;