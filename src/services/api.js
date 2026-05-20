import axios from "axios";

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

export const setAuthToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};