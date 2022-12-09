import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

const api = axios.create({
  withCredentials: true,
});

export const getUserById = async (userId) => {
  const response = await api.get(`${USERS_API}/${userId}`);
  return response.data;
}

export const getAllUsers = async () => {
  const response = await api.get(`${API_BASE}/allUsers`);
  return response.data;
}

export const getUserFullName = async (userId) => {
  const response = await api.get(`${USERS_API}/fullName/${userId}`);
  return response.data;
}

export const getUserBasicInfo = async (userId) => {
  const response = await api.get(`${USERS_API}/basicInfo/${userId}`);
  return response.data;
}

export const updateEmail = async (updatedEmail) => {
  const response = await api.put(`${USERS_API}/updateEmail`, updatedEmail);
  return response.data;
}

export const updatePhone = async (updatedPhone) => {
  const response = await api.put(`${USERS_API}/updatePhone`, updatedPhone);
  return response.data;
}

export const updateRole = async (updatedRole) => {
  const response = await api.put(`${USERS_API}/updateRole`, updatedRole);
  return response.data;
}
