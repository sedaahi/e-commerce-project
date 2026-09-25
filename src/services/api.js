import axios from "axios";

// Uygulama genelinde kullanılacak ortak Axios instance'ı oluşturulur.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// JWT token'ı tüm korumalı API isteklerine otomatik ekler.
export const setAuthToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Authorization header'ını temizler.
export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};