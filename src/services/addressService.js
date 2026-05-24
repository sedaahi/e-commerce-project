import { api } from "./api";

export const getAddresses = () => {
  return api.get("/user/address");
};

export const addAddress = (addressData) => {
  return api.post("/user/address", addressData);
};

export const updateAddress = (addressData) => {
  return api.put("/user/address", addressData);
};

export const deleteAddress = (addressId) => {
  return api.delete(`/user/address/${addressId}`);
};