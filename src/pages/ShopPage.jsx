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
  const { categoryId } = useParams();

  const filter = useSelector((state) => state.product.filter);
  const sort = useSelector((state) => state.product.sort);
  const limit = useSelector((state) => state.product.limit);
  const offset = useSelector((state) => state.product.offset);

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
