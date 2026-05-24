import { SET_ROLES, SET_USER, SET_ADDRESS_LIST, SET_SELECTED_ADDRESS, SET_SELECTED_BILLING_ADDRESS } from "../actions/actionTypes";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  selectedAddressId: null,
  selectedBillingAddressId: null,
  // theme: "",
  // language: "",
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_ROLES:
      return { ...state, roles: action.payload };

    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload };
    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddressId: action.payload,
      };

    case SET_SELECTED_BILLING_ADDRESS:
      return {
        ...state,
        selectedBillingAddressId: action.payload,
      };

    // case SET_THEME:
    //   return { ...state, theme: action.payload };

    // case SET_LANGUAGE:
    //   return { ...state, language: action.payload };

    default:
      return state;
  }
}
