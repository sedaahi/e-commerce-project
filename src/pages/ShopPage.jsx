import ShopHero from "../components/shop/ShopHero";
import ShopCategoryList from "../components/shop/ShopCategoryList";
import ShopFilterRow from "../components/shop/ShopFilterRow";
import ShopProductList from "../components/shop/ShopProductList";
import Brands from "../components/home/Brands";

export default function ShopPage() {
  return (
    <section className="w-full bg-[#FAFAFA]">
      <ShopHero />
      <ShopCategoryList />
      <ShopFilterRow />
      <ShopProductList />
      <Brands />
      <hr/>
    </section>
  );
}