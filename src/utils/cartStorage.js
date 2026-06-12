// Kullanıcıya özel localStorage key'i oluştur
export const getCartStorageKey = (user) => {
  if (user?.email) {
    return `cart_${user.email}`;
  }
// Kullanıcı giriş yapmamışsa:
// cart_guest kullan
  return "cart_guest";
};

// Kullanıcıya ait sepeti localStorage'dan oku
export const getCartFromLocalStorage = (user) => {
  const cart = localStorage.getItem(getCartStorageKey(user));
  return cart ? JSON.parse(cart) : [];
};
// Redux'taki güncel sepeti kullanıcıya özel localStorage alanına kaydet=>her kullanıcının sepeti birbirinden bağımsız
export const saveCartToLocalStorage = (cart, user) => {
  localStorage.setItem(getCartStorageKey(user), JSON.stringify(cart));
};

export const clearCartFromLocalStorage = (user) => {
  localStorage.removeItem(getCartStorageKey(user));
};