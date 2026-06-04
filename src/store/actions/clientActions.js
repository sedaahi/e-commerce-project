import {
  SET_ROLES,
  SET_USER,
  SET_ADDRESS_LIST,
  SET_SELECTED_ADDRESS,
  SET_SELECTED_BILLING_ADDRESS,
  SET_CREDIT_CARDS,
  SET_SELECTED_CARD,
} from "./actionTypes";
import { loadCartFromLocalStorage, setCart } from "./shoppingCartActions";
import { getRoles } from "../../services/roleService";
import { login, verify } from "../../services/authService";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../../services/addressService";
import {
  addCard,
  deleteCard,
  getCards,
  updateCard,
} from "../../services/cardService";
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

// export const setTheme = (theme) => ({
//   type: SET_THEME,
//   payload: theme,
// });

// export const setLanguage = (language) => ({
//   type: SET_LANGUAGE,
//   payload: language,
// });

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
      dispatch(loadCartFromLocalStorage());

      if (token) {
        setAuthToken(token);
      }

      if (rememberMe && token) {
        localStorage.setItem("token", token);
      }

      toast.success("Login successful.", {
        className: "!bg-[#F3FFF7] !border !border-[#4CAF50] !text-[#4CAF50]",
      });

      return response.data;
    } catch (error) {
      toast.error("Invalid email or password.", {
        className: "!bg-[#FFF3F3] !border !border-[#F44336] !text-[#F44336]",
      });
      throw error;
    }
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(loadCartFromLocalStorage());
      return;
    }

    try {
      setAuthToken(token);

      const response = await verify();

      const { token: renewedToken, ...userWithoutToken } = response.data;

      dispatch(setUser(userWithoutToken));
      dispatch(loadCartFromLocalStorage());

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
    dispatch(setCart([]));
    
    toast.success("Logged out successfully.", {
      className: "!bg-[#F3FFF7] !border !border-[#4CAF50] !text-[#4CAF50]",
    });
  };
};

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});

export const fetchAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await getAddresses();
      dispatch(setAddressList(response.data));
    } catch (error) {
      console.error("Addresses could not be fetched:", error);
      throw error;
    }
  };
};

export const createAddress = (addressData) => {
  return async (dispatch) => {
    try {
      await addAddress(addressData);
      dispatch(fetchAddresses());
    } catch (error) {
      console.error("Address could not be created:", error);
      throw error;
    }
  };
};

export const editAddress = (addressData) => {
  return async (dispatch) => {
    try {
      await updateAddress(addressData);
      dispatch(fetchAddresses());
    } catch (error) {
      console.error("Address could not be updated:", error);
      throw error;
    }
  };
};

export const removeAddress = (addressId) => {
  return async (dispatch) => {
    try {
      await deleteAddress(addressId);
      dispatch(fetchAddresses());
    } catch (error) {
      console.error("Address could not be deleted:", error);
      throw error;
    }
  };
};

export const setSelectedAddress = (addressId) => ({
  type: SET_SELECTED_ADDRESS,
  payload: addressId,
});

export const setSelectedBillingAddress = (addressId) => ({
  type: SET_SELECTED_BILLING_ADDRESS,
  payload: addressId,
});

export const setCreditCards = (cards) => ({
  type: SET_CREDIT_CARDS,
  payload: cards,
});

export const setSelectedCard = (cardId) => ({
  type: SET_SELECTED_CARD,
  payload: cardId,
});

export const fetchCards = () => {
  return async (dispatch) => {
    try {
      const response = await getCards();
      dispatch(setCreditCards(response.data));
    } catch (error) {
      console.error("Cards could not be fetched:", error);
      throw error;
    }
  };
};

export const createCard = (cardData) => {
  return async (dispatch) => {
    try {
      await addCard(cardData);
      dispatch(fetchCards());
    } catch (error) {
      console.error("Card could not be created:", error);
      throw error;
    }
  };
};

export const editCard = (cardData) => {
  return async (dispatch) => {
    try {
      await updateCard(cardData);
      dispatch(fetchCards());
    } catch (error) {
      console.error("Card could not be updated:", error);
      throw error;
    }
  };
};

export const removeCard = (cardId) => {
  return async (dispatch) => {
    try {
      await deleteCard(cardId);
      dispatch(fetchCards());
    } catch (error) {
      console.error("Card could not be deleted:", error);
      throw error;
    }
  };
};
