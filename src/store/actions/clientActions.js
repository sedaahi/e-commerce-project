import {
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
} from "./actionTypes";

import { getRoles } from "../../services/roleService";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const roles = getState().client.roles;

    if (roles.length > 0) return;

    try {
      const response = await getRoles();
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error("Roles could not be fetched:", error);
      throw error;
    }
  };
};