import { api } from "./api";

export const getProducts = (params = {}) => {
  return api.get("/products", { params });
};

export const getProductById = (productId) => {
  return api.get(`/products/${productId}`);
};