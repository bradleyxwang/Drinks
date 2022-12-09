import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const RATINGS_API = `${API_BASE}/ratings`;

const api = axios.create({
  withCredentials: true,
});

export const getUserDrinkRating = async (userId, drinkId) => {
  const response = await api.get(`${RATINGS_API}/${userId}/${drinkId}`);
  return response.data;
};

export const getUserDrinkReview = async (userId, drinkId) => {
  const response = await api.get(`${RATINGS_API}/${userId}/${drinkId}`);
  return response.data;
};

export const getAllUserRatings = async (userId) => {
  const response = await api.get(`${RATINGS_API}/${userId}`);
  return response.data;
};

export const getAllDrinkRatings = async (drinkId) => {
  const response = await api.get(`${RATINGS_API}/${drinkId}`);
  return response.data;
};

export const updateRating = async (rating) => {
  const response = api.put(RATINGS_API, rating);
  return response.data;
};

export const getMostPopularUsers = async () => {
  const response = await api.get(`${API_BASE}/mostOccurringUsers`);
  return response.data;
}

export const getMostRecentReviews = async (userId) => {
  const response = await api.get(`${API_BASE}/recent/${userId}`);
  return response.data;
}
