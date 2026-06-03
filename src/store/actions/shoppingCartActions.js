import { CLEAR_CART, SET_ADDRESS, SET_CART, SET_PAYMENT } from "./actionTypes";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

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

export const addToCart = (product) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const existingItem = cart.find((item) => item.product.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item
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

    saveCartToLocalStorage(updatedCart);
    dispatch(setCart(updatedCart));
  };
};

export const increaseCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart.map((item) => {
      if (item.product.id !== productId) return item;

      if (item.count >= item.product.stock) { // stocktan daha fazla eklememe kontrolü
        return item;
      }

      return {
        ...item,
        count: item.count + 1,
      };
    });

    saveCartToLocalStorage(updatedCart);
    dispatch(setCart(updatedCart));
  };
};
export const decreaseCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart
      .map((item) =>
        item.product.id === productId
          ? { ...item, count: item.count - 1 }
          : item
      )
      .filter((item) => item.count > 0);

    saveCartToLocalStorage(updatedCart);
    dispatch(setCart(updatedCart));
  };
};

export const removeCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart.filter((item) => item.product.id !== productId);

    saveCartToLocalStorage(updatedCart);
    dispatch(setCart(updatedCart));
  };
};

export const toggleCartItem = (productId) => {
  return (dispatch, getState) => {
    const cart = getState().shoppingCart.cart;

    const updatedCart = cart.map((item) =>
      item.product.id === productId
        ? { ...item, checked: !item.checked }
        : item
    );

    saveCartToLocalStorage(updatedCart);
    dispatch(setCart(updatedCart));
  };
};

export const clearCart = () => {
  localStorage.removeItem("cart");

  return {
    type: CLEAR_CART,
  };
};