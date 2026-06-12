import axios from "axios";

// Uygulama genelinde kullanılacak ortak Axios instance'ı oluşturulur.
// Böylece her istekte tekrar tekrar baseURL yazmak zorunda kalmayız.
export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

// Login veya verify işlemi sonrasında gelen token'ı API isteklerine otomatik eklemek için
export const setAuthToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

// Authorization header'ını temizler.
export const clearAuthToken = () => {
  delete api.defaults.headers.common.Authorization;
};