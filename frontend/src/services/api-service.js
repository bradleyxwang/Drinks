import axios from "axios";
const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";

export const search = async (searchString) => {
  const response = await axios.get(`${API_BASE}/search.php?${searchString}`);
  return response.data;
};

export const lookup = async (lookupString) => {
  const response = await axios.get(`${API_BASE}/lookup.php?${lookupString}`);
  return response.data;
};

export const filter = async (filterString) => {
  const response = await axios.get(`${API_BASE}/filter.php?${filterString}`);
  return response.data;
};

export const random = async () => {
  const response = await axios.get(`${API_BASE}/random.php`);
  return response.data;
};
