import { bestsellerProducts } from "../../data/productDetailBestSellerData";

export default function BestsellerProducts() {
  return (
    <section className="bg-[#FAFAFA] py-[48px]">
      <div className="mx-auto max-w-[1124px] px-[42px] md:px-0">
        <h3 className="mb-[24px] text-[24px] font-bold leading-[32px] text-[#252B42] md:text-[20px]">
          BESTSELLER PRODUCTS
        </h3>

        <div className="h-px w-full bg-[#ECECEC] mb-[24px]" />

        <div className="flex flex-col gap-[30px] md:flex-row md:flex-wrap md:gap-[30px]">
          {bestsellerProducts.map((product) => (
            <div key={product.id} className="bg-white md:w-[239px]">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="h-[427px] w-full object-cover md:h-[280px]"
              />

              <div className="px-[25px] pb-[35px] pt-[25px]">
                <h5 className="text-[16px] font-bold leading-[24px] text-[#252B42]">
                  {product.name}
                </h5>

                <p className="mt-[10px] text-[14px] font-bold leading-[24px] text-[#737373]">
                  {product.department}
                </p>

                <div className="mt-[10px] flex gap-[5px]">
                  <span className="text-[16px] font-bold leading-[24px] text-[#BDBDBD]">
                    {product.oldPrice}
                  </span>
                  <span className="text-[16px] font-bold leading-[24px] text-[#23856D]">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
