import { api } from "./api";

export const createOrderRequest = (orderData) => {
  return api.post("/order", orderData);
};

export const getOrders = () => {
  return api.get("/order");
};
