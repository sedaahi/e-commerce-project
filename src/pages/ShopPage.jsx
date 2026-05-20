import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ShopHero from "../components/shop/ShopHero";
import ShopCategoryList from "../components/shop/ShopCategoryList";
import ShopFilterRow from "../components/shop/ShopFilterRow";
import ShopProductList from "../components/shop/ShopProductList";
import Brands from "../layout/Brands";

import { fetchProducts } from "../store/actions/productActions";

export default function ShopPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="w-full bg-[#FAFAFA]">
      <ShopHero />
      <ShopCategoryList />
      <ShopFilterRow />
      <ShopProductList />
      <Brands showContent={false} bgColor="bg-[#fafafa]" />
      <hr />
    </section>
  );
}