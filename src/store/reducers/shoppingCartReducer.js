import {
  CLEAR_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
} from "../actions/actionTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        payment: {},
        address: {},
      };

    default:
      return state;
  }
}