import shopProductImage from "../assets/images/shop/shop-product.png";

export const shopProducts = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: "Graphic Design",
  description: "English Department",
  price: 6.48,
  oldPrice: 16.48,
  stock: 84,
  store_id: 1,
  category_id: 1,
  rating: 0.35,
  sell_count: 923,
  images: [
    {
      url: shopProductImage,
      index: 0,
    },
  ],
}));