import { api } from "./api";

export const signup = (data) => {
  return api.post("/signup", data);
};

export const login = (loginData) => {
  return api.post("/login", loginData);
};