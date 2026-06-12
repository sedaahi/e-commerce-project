import { slugify } from "./slugify";

// 03.06.2026 21:53
export const formatDate = (date) => {
  return new Date(date).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Fiyatları standart para formatında göstermek için kullanılır.
// $145.99
export const formatPrice = (price) => {
  return `$${Number(price || 0).toFixed(2)}`;
};

// Kart numarasını güvenlik amacıyla maskeleyerek gösterir.
// Siparişlerim ve ödeme ekranında kullanılıyor.
export const maskCardNumber = (cardNo) => {
  const value = String(cardNo || "");
  return `**** **** **** ${value.slice(-4)}`;
};

// Kartın ilk 4 ve son 4 hanesini gösterir.
// Kullanıcının hangi kartı seçtiğini daha rahat anlaması için 
export const maskCardNumberWithFirstDigits = (cardNo) => {
  const value = String(cardNo || "");

  if (!value) return "";

  return `${value.slice(0, 4)} **** **** ${value.slice(-4)}`;
};

// Siparişleri en yeniden en eskiye sıralar.
export const sortOrdersByNewest = (orders) => {
  return [...(orders || [])].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date),
  );
};

// URL daha okunabilir hale gelmesi ve Seo uyumlu olması için
export const getCategoryPath = (category) => {
  if (!category) return "/shop";

  const [genderCode, categoryName] = category.code.split(":");

  const gender = genderCode === "k" ? "kadin" : "erkek";

  return `/shop/${gender}/${categoryName}/${category.id}`;
};

export const getProductDetailPath = (category, product) => {
  if (!category) return `/shop/product/${product.id}`;

  const [genderCode, categoryName] = category.code.split(":");

  const gender = genderCode === "k" ? "kadin" : "erkek";

  const productSlug = slugify(product.name);

  return `/shop/${gender}/${categoryName}/${category.id}/${productSlug}/${product.id}`;
};