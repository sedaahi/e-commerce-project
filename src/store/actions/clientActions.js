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

// Kullanıcı bilgisini Redux store'a kaydeden basic action creator.
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});
// Kullanıcının adres listesini Redux store'a kaydeden basic action creator.
export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});

// Checkout sırasında seçilen teslimat adresinin id'sini Redux store'a kaydeder.
export const setSelectedAddress = (addressId) => ({
  type: SET_SELECTED_ADDRESS,
  payload: addressId,
});

// Checkout sırasında seçilen fatura adresinin id'sini Redux store'a kaydeder.
export const setSelectedBillingAddress = (addressId) => ({
  type: SET_SELECTED_BILLING_ADDRESS,
  payload: addressId,
});

// Kullanıcının kredi kartı listesini Redux store'a kaydeden basic action creator.
export const setCreditCards = (cards) => ({
  type: SET_CREDIT_CARDS,
  payload: cards,
});

// Checkout sırasında seçilen kartın id'sini Redux store'a kaydeder.
export const setSelectedCard = (cardId) => ({
  type: SET_SELECTED_CARD,
  payload: cardId,
});
// export const setTheme = (theme) => ({
//   type: SET_THEME,
//   payload: theme,
// });

// export const setLanguage = (language) => ({
//   type: SET_LANGUAGE,
//   payload: language,
// });

// Role listesini API'den çeken thunk action creator.
// "If needed" mantığıyla çalışır: roles zaten Redux'ta varsa tekrar API isteği atmaz.
// Böylece gereksiz network isteği engellenir.
export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    // Redux store'daki mevcut role listesi alınır.
    const roles = getState().client.roles;

    // Eğer roles daha önce çekildiyse tekrar API isteği yapılmaz.
    if (roles.length > 0) return;

    try {
      // Role listesi API'den alınır.
      const response = await getRoles();

      // Gelen role listesi Redux store'a kaydedilir.
      dispatch(setRoles(response.data));
    } catch (error) {
      // API isteği başarısız olursa hata console'a yazılır.
      console.error("Roles could not be fetched:", error);

      // Hata component tarafında da yakalanabilsin diye tekrar fırlatılır.
      throw error;
    }
  };
};

export const loginUser = (loginData, rememberMe) => {
  return async (dispatch) => {
    try {
      // Login bilgileri API'ye gönderilir.
      const response = await login(loginData);

      // API'den gelen response içinden token ayrılır,
      // kalan kullanıcı bilgileri userWithoutToken olarak tutulur.
      const { token, ...userWithoutToken } = response.data;

      // Kullanıcı bilgisi Redux store'a kaydedilir.
      dispatch(setUser(userWithoutToken));

      // localStorage'da kayıtlı sepet varsa Redux cart state'ine yüklenir.
      dispatch(loadCartFromLocalStorage());

      // Token geldiyse axios Authorization header'a eklenir.
      // Böylece sonraki auth gerektiren isteklerde token otomatik gönderilir.
      if (token) {
        setAuthToken(token);
      }

      // Kullanıcı "Remember me" seçtiyse token localStorage'a kaydedilir.
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

// Sayfa yenilendiğinde veya uygulama açıldığında token'ı doğrular
// Token geçerliyse kullanıcıyı Redux'a tekrar kaydeder.
export const verifyToken = () => {
  return async (dispatch) => {
    // localStorage'dan kayıtlı token alınır.
    const token = localStorage.getItem("token");

    // Eğer token yoksa kullanıcı login değildir sadece localStorage'daki sepet Redux'a yüklenir.
    if (!token) {
      dispatch(loadCartFromLocalStorage());
      return;
    }

    try {
      // Token axios Authorization header'a eklenir.
      setAuthToken(token);

      // Token'ın geçerli olup olmadığını kontrol etmek için API isteği yapılır.
      const response = await verify();

      // API'den yeni token geldiyse ayrılır,
      // kalan kullanıcı bilgileri userWithoutToken olarak tutulur.
      const { token: renewedToken, ...userWithoutToken } = response.data;

      // Doğrulanan kullanıcı bilgisi Redux store'a kaydedilir.
      dispatch(setUser(userWithoutToken));

      // localStorage'daki sepet Redux cart state'ine yüklenir.
      dispatch(loadCartFromLocalStorage());

      // API yeni token döndürdüyse localStorage ve axios header güncellenir.
      if (renewedToken) {
        localStorage.setItem("token", renewedToken);
        setAuthToken(renewedToken);
      }
    } catch (error) {
      // Token geçersizse localStorage'dan silinir.
      localStorage.removeItem("token");

      // Axios Authorization header temizlenir.
      clearAuthToken();

      // Redux'taki kullanıcı bilgisi temizlenir.
      dispatch(setUser({}));

      // Hata debug için console'a yazılır.
      console.error("Token verification failed:", error);
    }
  };
};

// Token'ı temizler, kullanıcı bilgisini sıfırlar ve sepet state'ini boşaltır.
export const logoutUser = () => {
  return (dispatch) => {
    // localStorage'daki token silinir.
    localStorage.removeItem("token");

    // Axios Authorization header temizlenir.
    clearAuthToken();

    dispatch(setUser({}));

    dispatch(setCart([]));

    toast.success("Logged out successfully.", {
      className: "!bg-[#F3FFF7] !border !border-[#4CAF50] !text-[#4CAF50]",
    });
  };
};

// Kullanıcının adres listesini API'den çeken thunk action creator.
export const fetchAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await getAddresses();

      // Gelen adres listesi Redux store'a kaydedilir.
      dispatch(setAddressList(response.data));
    } catch (error) {
      console.error("Addresses could not be fetched:", error);
      throw error;
    }
  };
};

// Yeni adres oluşturmak için kullanılan thunk action creator.
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

// Kullanıcının kayıtlı kredi kartlarını API'den çeken thunk action creator.
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