import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

import ShopProductCard from "./ShopProductCard";
import ShopPagination from "./ShopPagination";

export default function ShopProductList() {
  const products = useSelector((state) => state.product.productList);
  const fetchState = useSelector((state) => state.product.fetchState);

  if (fetchState === "FETCHING") {
    return (
      <div className="w-full bg-white">
        <div className="mx-auto flex min-h-[360px] items-center justify-center px-[43px] py-[48px] md:max-w-[1124px] md:px-0">
          <Loader2 className="animate-spin text-[#23A6F0]" size={36} />
        </div>
      </div>
    );
  }

  if (fetchState === "FAILED") {
    return (
      <div className="w-full bg-white">
        <div className="mx-auto flex min-h-[240px] items-center justify-center px-[43px] py-[48px] md:max-w-[1124px] md:px-0">
          <p className="text-center text-[14px] font-bold text-red-500">
            Products could not be loaded.
          </p>
        </div>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="w-full bg-white">
        <div className="mx-auto flex min-h-[240px] items-center justify-center px-[43px] py-[48px] md:max-w-[1124px] md:px-0">
          <p className="text-center text-[14px] font-bold text-[#737373]">
            No products found.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-white">
      <div className="mx-auto px-[43px] pb-[48px] pt-[32px] md:max-w-[1124px] md:px-0 md:pb-[48px] md:pt-[48px]">
        <div className="flex flex-col items-center gap-[30px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[20px] md:gap-y-[48px]">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full md:w-[18%] md:min-w-[180px]"
            >
              <ShopProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-[48px]">
          <ShopPagination />
        </div>
      </div>
    </div>
  );
}
