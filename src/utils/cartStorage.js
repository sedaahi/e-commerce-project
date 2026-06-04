export const getCartStorageKey = (user) => {
  if (user?.email) {
    return `cart_${user.email}`;
  }

  return "cart_guest";
};

export const getCartFromLocalStorage = (user) => {
  const cart = localStorage.getItem(getCartStorageKey(user));
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToLocalStorage = (cart, user) => {
  localStorage.setItem(getCartStorageKey(user), JSON.stringify(cart));
};

export const clearCartFromLocalStorage = (user) => {
  localStorage.removeItem(getCartStorageKey(user));
};