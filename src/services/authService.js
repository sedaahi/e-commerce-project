import { api } from "../api/api";

export const signup = (data) => {
  return api.post("/signup", data);
};