import { CLEAR_CART, SET_ADDRESS, SET_CART, SET_PAYMENT } from "./actionTypes";
import {
  clearCartFromLocalStorage,
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../utils/cartStorage";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

// Login/verify sonrası veya guest kullanımda,
// ilgili kullanıcının sepetini localStorage'dan okuyup Redux'a yükler
export const loadCartFromLocalStorage = () => {
  return (dispatch, getState) => {
    const user = getState().client.user;
    const cart = getCartFromLocalStorage(user);

    dispatch(setCart(cart));
  };
};


export const addToCart = (product) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;
    const user = getState().client.user;

    const existingItem = cart.find((item) => item.product.id === product.id);

    let updatedCart;

    // Ürün sepette varsa count değerini artır yoksa yeni item olarak ekle
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item,
      );
    } else {
      updatedCart = [
        ...cart,
        {
          count: 1,
          checked: true,
          product,
        },
      ];
    }

    // hem localStorage'a kaydeder hem Redux cart state'ini güncelle
    saveCartToLocalStorage(updatedCart, user);
    dispatch(setCart(updatedCart));
  };
};

// Sepetteki ürün adedini artırır.
export const increaseCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;
    const user = getState().client.user;

    const updatedCart = cart.map((item) => {
      if (item.product.id !== productId) return item;

      //Stock adetinden fazla arttırmamak için
      if (item.count >= item.product.stock) {
        return item;
      }

      return {
        ...item,
        count: item.count + 1,
      };
    });

    saveCartToLocalStorage(updatedCart, user);
    dispatch(setCart(updatedCart));
  };
};


export const decreaseCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;
    const user = getState().client.user;

    const updatedCart = cart
      .map((item) =>
        item.product.id === productId
          ? { ...item, count: item.count - 1 }
          : item,
      )
      .filter((item) => item.count > 0);

    saveCartToLocalStorage(updatedCart, user);
    dispatch(setCart(updatedCart));
  };
};


export const removeCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;
    const user = getState().client.user;

    const updatedCart = cart.filter((item) => item.product.id !== productId);

    saveCartToLocalStorage(updatedCart, user);
    dispatch(setCart(updatedCart));
  };
};

// Ürünün checkout'a dahil edilip edilmeyeceğini değiştirir.(Checkbox kontrolü)
export const toggleCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;
    const user = getState().client.user;

    const updatedCart = cart.map((item) =>
      item.product.id === productId
        ? { ...item, checked: !item.checked }
        : item,
    );

    saveCartToLocalStorage(updatedCart, user);
    dispatch(setCart(updatedCart));
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    const user = getState().client.user;

    clearCartFromLocalStorage(user);

    dispatch({
      type: CLEAR_CART,
    });
  };
};
