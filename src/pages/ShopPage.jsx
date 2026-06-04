import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ShopHero from "../components/shop/ShopHero";
import ShopCategoryList from "../components/shop/ShopCategoryList";
import ShopFilterRow from "../components/shop/ShopFilterRow";
import ShopProductList from "../components/shop/ShopProductList";
import Brands from "../layout/Brands";

import { fetchProducts,setOffset } from "../store/actions/productActions";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();   // url'den catId al

  const filter = useSelector((state) => state.product.filter); //inputtan gelen arama
  const sort = useSelector((state) => state.product.sort);     //selectten gelen sıralama
  const limit = useSelector((state) => state.product.limit);   //sayfa başına ürün sayısı
  const offset = useSelector((state) => state.product.offset); //kaç ürün geçileceği   

  useEffect(() => {
    const params = {
      limit,
      offset,
    };

    if (categoryId) params.category = categoryId;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;

    dispatch(fetchProducts(params));
  }, [dispatch, categoryId, filter, sort, limit, offset]);
  useEffect(() => {
    dispatch(setOffset(0));
  }, [dispatch, categoryId]);
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
