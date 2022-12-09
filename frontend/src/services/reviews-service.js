import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const REVIEWS_API = `${API_BASE}/reviews`;

const api = axios.create({
  withCredentials: true,
});

export const getUserDrinkReview = async (userId, drinkId) => {
  const response = await api.get(`${REVIEWS_API}/${userId}/${drinkId}`);
  return response.data;
};

export const getAllUserReviews = async (userId) => {
  const response = await api.get(`${REVIEWS_API}/${userId}`);
  return response.data;
};

export const getAllDrinkReviews = async (drinkId) => {
  const response = await api.get(`${REVIEWS_API}/${drinkId}`);
  return response.data;
};

export const updateReview = async (review) => {
  const response = api.put(REVIEWS_API, review);
  return response.data;
};

export const getMostPopularUsers = async () => {
  const response = await api.get(`${REVIEWS_API}/mostOccurringUsers`);
  return response.data;
}

export const getMostRecentCommentReviews = async (userId) => {
  const response = await api.get(`${API_BASE}/recent_reviews/${userId}`);
  return response.data;
}
