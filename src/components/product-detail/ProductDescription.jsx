export default function ProductDescription({ product }) {
  return (
    <section className="bg-white py-[48px]">
  <div className="mx-auto max-w-[1050px] px-6 md:px-0">
    <div className="mb-[32px] flex border-b border-[#ECECEC]">
      <button className="border-b-2 border-[#23856D] px-6 pb-4 text-[14px] font-bold text-[#252B42]">
        Description
      </button>
    </div>

    <div className="max-w-[600px]">
      <h3 className="text-[24px] font-bold text-[#252B42]">
        Product Description
      </h3>

      <p className="mt-4 text-[14px] leading-[24px] text-[#737373]">
        {product.description}
      </p>
    </div>
  </div>
</section>
  );
}
