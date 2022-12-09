import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const AUTH_API = `${API_BASE}/auth`;

const api = axios.create({
  withCredentials: true,
});

export const register = (user) =>
  api.post(`${AUTH_API}/register`, user).then((response) => response.data);

export const login = (user) =>
  api.post(`${AUTH_API}/login`, user).then((response) => response.data);

export const logout = (user) =>
  api.post(`${AUTH_API}/logout`, user).then((response) => response.data);

export const profile = () =>
  api.post(`${AUTH_API}/profile`).then((response) => response.data);
