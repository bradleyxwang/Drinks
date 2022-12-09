import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const FAVORITE_DRINKS_API = `${API_BASE}/favorite/drinks`;

const api = axios.create({
  withCredentials: true,
});

export const getFavoriteDrinks = async (userId) => {
  const response = await api.get(`${FAVORITE_DRINKS_API}/${userId}`);
  return response.data;
};

export const addFavoriteDrink = async (userId, drinkId, fullName, drinkName) => {
  const response = await api.post(`${FAVORITE_DRINKS_API}/new/${userId}/${drinkId}`,
      {fullName : fullName, drinkName : drinkName});
  return response.data;
};

export const deleteFavoriteDrink = async (userId, drinkId) => {
  const response = await api.delete(`${FAVORITE_DRINKS_API}/delete/${userId}/${drinkId}`);
  return response.data;
};

export const favoriteDrinkExists = async (userId, drinkId) => {
  const response = await api.get(`${FAVORITE_DRINKS_API}/exists/${userId}/${drinkId}`);
  return response.data;
}

export const getFavoriteBartenders = async (drinkId) => {
  const response = await api.get(`${API_BASE}/favorite/bartenders/${drinkId}`);
  return response.data;
};
