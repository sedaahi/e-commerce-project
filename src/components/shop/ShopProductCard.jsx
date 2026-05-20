import shopProductImage from "../../assets/images/shop/shop-product.png";

export default function ShopProductCard({ product }) {
  const productImage = product.images?.[0]?.url || shopProductImage;
  const oldPrice = product.oldPrice || product.price * 1.2;

  return (
    <div className="flex w-full flex-col items-center md:w-[239px]">
      <img
        src={productImage}
        alt={product.name}
        className="h-[427px] w-full object-cover md:h-[300px] md:w-[239px]"
      />

      <div className="flex flex-col items-center px-[25px] pb-[35px] pt-[25px]">
        <h3 className="text-center text-[16px] font-bold leading-[24px] text-[#252B42]">
          {product.name}
        </h3>

        <p className="mt-[10px] line-clamp-2 text-center text-[14px] font-bold leading-[24px] text-[#737373]">
          {product.description}
        </p>

        <div className="mt-[5px] flex items-center gap-[5px]">
          <span className="text-[16px] font-bold leading-[24px] text-[#BDBDBD]">
            ${oldPrice.toFixed(2)}
          </span>

          <span className="text-[16px] font-bold leading-[24px] text-[#23856D]">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="mt-[10px] flex items-center gap-[6px]">
          <span className="h-[16px] w-[16px] rounded-full bg-[#23A6F0]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#E77C40]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#252B42]" />
        </div>
      </div>
    </div>
  );
}