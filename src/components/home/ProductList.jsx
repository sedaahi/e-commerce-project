import ProductCard from "./ProductCard";
import { products } from "../../data/products";

export default function ProductList() {
  return (
    <section className="mx-auto mt-[80px] flex max-w-[1124px] flex-col items-center px-4">
      <div className="mb-[80px] flex flex-col items-center text-center md:mb-[50px]">
        <p className="text-[20px] font-normal leading-[30px] text-[#737373]">
          Featured Products
        </p>

        <h2 className="mt-[10px] text-[24px] font-bold leading-[32px] text-[#252B42]">
          BESTSELLER PRODUCTS
        </h2>

        <p className="mt-[10px] max-w-[300px] text-[14px] font-normal leading-[20px] text-[#737373] md:max-w-none">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="flex flex-col items-center gap-y-[80px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[30px] md:gap-y-[50px]">
        {products.map((product, index) => (
          <div key={product.id} className={index >= 5 ? "hidden md:block" : ""}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button className="mt-[80px] h-[52px] w-[261px] rounded-[5px] border border-[#23A6F0] text-[14px] font-bold text-[#23A6F0] md:mt-[50px]">
        LOAD MORE PRODUCTS
      </button>
    </section>
  );
}