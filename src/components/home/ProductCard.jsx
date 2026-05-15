export default function ProductCard({ product }) {
  return (
    <article className="flex w-full max-w-[295px] flex-col items-center text-center md:max-w-[183px]">
      <img
        src={product.image}
        alt={product.title}
        className="h-[360px] w-[295px] object-cover md:h-[238px] md:w-[183px]"
      />

      <div className="mt-[25px] flex flex-col items-center gap-[10px] md:mt-[25px]">
        <h3 className="text-[16px] font-bold leading-[24px] text-[#252B42]">
          {product.title}
        </h3>

        <p className="text-[14px] font-bold leading-[24px] text-[#737373]">
          {product.category}
        </p>

        <div className="flex gap-[5px]">
          <span className="text-[16px] font-bold leading-[24px] text-[#BDBDBD]">
            {product.oldPrice}
          </span>

          <span className="text-[16px] font-bold leading-[24px] text-[#23856D]">
            {product.price}
          </span>
        </div>
      </div>
    </article>
  );
}