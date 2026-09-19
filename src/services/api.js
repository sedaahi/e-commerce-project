import axios from "axios";

// Uygulama genelinde kullanılacak ortak Axios instance'ı oluşturulur.
export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// JWT token'ı tüm korumalı API isteklerine otomatik ekler.
export const setAuthToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Authorization header'ını temizler.
export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};