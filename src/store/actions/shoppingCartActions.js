import { SET_ADDRESS, SET_CART, SET_PAYMENT } from "./actionTypes";

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

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, count: item.count + 1 }
          : item
      );

      dispatch(setCart(updatedCart));
      return;
    }

    dispatch(
      setCart([
        ...cart,
        {
          count: 1,
          checked: true,
          product,
        },
      ])
    );
  };
};