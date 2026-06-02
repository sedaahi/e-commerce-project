import {
  SET_ROLES,
  SET_USER,
  SET_ADDRESS_LIST,
  SET_SELECTED_ADDRESS,
  SET_SELECTED_BILLING_ADDRESS,
  SET_CREDIT_CARDS,
  SET_SELECTED_CARD,
} from "../actions/actionTypes";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  selectedCardId: null,
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
    case SET_CREDIT_CARDS:
      return { ...state, creditCards: action.payload };

    case SET_SELECTED_CARD:
      return { ...state, selectedCardId: action.payload };
    // case SET_THEME:
    //   return { ...state, theme: action.payload };

    // case SET_LANGUAGE:
    //   return { ...state, language: action.payload };

    default:
      return state;
  }
}
