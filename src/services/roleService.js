import { api } from "../api/api";

export const getRoles = () => {
  return api.get("/roles");
};