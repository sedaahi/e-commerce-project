import { shopProducts } from "../../data/shopProducts";
import ShopProductCard from "./ShopProductCard";
import ShopPagination from "./ShopPagination";

export default function ShopProductList() {
  const mobileProducts = shopProducts.slice(0, 4);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto px-[43px] pb-[48px] pt-[32px] md:max-w-[1124px] md:px-0 md:pb-[48px] md:pt-[48px]">
        <div className="flex flex-col items-center gap-[30px] md:hidden">
          {mobileProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="hidden flex-wrap justify-center gap-x-[30px] gap-y-[48px] md:flex">
          {shopProducts.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-[48px]">
          <ShopPagination />
        </div>
      </div>
    </div>
  );
}