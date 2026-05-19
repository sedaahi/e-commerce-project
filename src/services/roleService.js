import { api } from "./api";

export const getRoles = () => {
  return api.get("/roles");
};
