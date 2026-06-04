export const getCardType = (cardNo) => {
  const value = String(cardNo || "");

  if (value.startsWith("4")) return "VISA";
  if (value.startsWith("5") || value.startsWith("2")) return "MASTERCARD";

  return "CARD";
};