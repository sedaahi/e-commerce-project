import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ShopHero from "../components/shop/ShopHero";
import ShopCategoryList from "../components/shop/ShopCategoryList";
import ShopFilterRow from "../components/shop/ShopFilterRow";
import ShopProductList from "../components/shop/ShopProductList";
import Brands from "../layout/Brands";

import { fetchProducts, setOffset } from "../store/actions/productActions";

export default function ShopPage() {

  const dispatch = useDispatch();

  // URL'den categoryId parametresi alınır.
  // /shop/kadin/tshirt/1  => categoryId = 1
  const { categoryId } = useParams();

  // Kullanıcının filtre inputuna yazdığı metin
  const filter = useSelector((state) => state.product.filter);

  //sıralama türü=>price:asc, price:desc
  const sort = useSelector((state) => state.product.sort);

  // Sayfa başına gösterilecek ürün sayısı : 25
  const limit = useSelector((state) => state.product.limit);

  // Pagination için kaç ürünün atlanacağını tutar Sayfa 1 → offset 0 Sayfa 2 → offset 25
  const offset = useSelector((state) => state.product.offset);

  useEffect(() => {
    // API isteğinde kullanılacak query parametreleri oluştur
    const params = {
      limit,
      offset,
    };

    // Kategori seçilmişse kategori filtresi eklenir.
    if (categoryId) params.category = categoryId;

    // Arama filtresi varsa eklenir.
    if (filter) params.filter = filter;

    // Sıralama seçilmişse eklenir.
    if (sort) params.sort = sort;

    // Parametrelerden herhangi biri değiştiğinde
    // ürünler yeniden API'den çekilir.
    dispatch(fetchProducts(params));

  }, [dispatch, categoryId, filter, sort, limit, offset]);

  useEffect(() => {

    // Kullanıcı kategori değiştirdiğinde pagination ilk sayfaya döndürülür.
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