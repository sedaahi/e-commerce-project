import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "./actionTypes";

import { getRoles } from "../../services/roleService";
import { login, verify } from "../../services/authService";
import { clearAuthToken, setAuthToken } from "../../services/api";
import { toast } from "react-toastify";

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

export const loginUser = (loginData, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await login(loginData);

      const { token, ...userWithoutToken } = response.data;

      dispatch(setUser(userWithoutToken));

      if (token) {
        setAuthToken(token);
      }

      if (rememberMe && token) {
        localStorage.setItem("token", token);
      }

      toast.success("Login successful.");

      return response.data;
    } catch (error) {
      toast.error("Invalid email or password.");
      throw error;
    }
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      setAuthToken(token);

      const response = await verify();

      const { token: renewedToken, ...userWithoutToken } = response.data;

      dispatch(setUser(userWithoutToken));

      if (renewedToken) {
        localStorage.setItem("token", renewedToken);
        setAuthToken(renewedToken);
      }
    } catch (error) {
      localStorage.removeItem("token");
      clearAuthToken();
      dispatch(setUser({}));

      console.error("Token verification failed:", error);
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    clearAuthToken();

    dispatch(setUser({}));

    toast.success("Logged out successfully.");
  };
};