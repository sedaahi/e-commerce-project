export const formatDate = (date) => {
  return new Date(date).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatPrice = (price) => {
  return `$${Number(price || 0).toFixed(2)}`;
};

export const maskCardNumber = (cardNo) => {
  const value = String(cardNo || "");
  return `**** **** **** ${value.slice(-4)}`;
};

export const maskCardNumberWithFirstDigits = (cardNo) => {
  const value = String(cardNo || "");

  if (!value) return "";

  return `${value.slice(0, 4)} **** **** ${value.slice(-4)}`;
};

export const sortOrdersByNewest = (orders) => {
  return [...(orders || [])].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date),
  );
};