import { Eye, Heart, ShoppingCart, Star } from "lucide-react";

const colorOptions = ["#23A6F0", "#2DC071", "#E77C40", "#252B42"];

export default function ProductInfo({ product }) {
  return (
    <div className="w-full md:w-[510px] md:pt-[11px]">
      <h1 className="text-[20px] font-normal leading-[30px] text-[#252B42]">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-[10px]">
        <div className="flex gap-[2px] text-[#F3CD03]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={22}
              fill={index < Math.round(product.rating) ? "currentColor" : "none"}
            />
          ))}
        </div>

        <span className="text-[14px] font-bold text-[#737373]">
          {product.sell_count} Reviews
        </span>
      </div>

      <p className="mt-5 text-[24px] font-bold leading-[32px] text-[#252B42]">
        ${product.price.toLocaleString("en-US")}
      </p>

      <p className="mt-[5px] text-[14px] font-bold text-[#737373]">
        Availability :{" "}
        <span className="text-[#23A6F0]">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </p>

      <p className="mt-8 max-w-[464px] text-[14px] font-normal leading-5 text-[#858585]">
        {product.description}
      </p>

      <hr className="mt-[30px] border-[#BDBDBD]" />

      <div className="mt-[30px] flex gap-[10px]">
        {colorOptions.map((color) => (
          <button
            key={color}
            className="h-[30px] w-[30px] rounded-full"
            style={{ backgroundColor: color }}
            aria-label="Choose product color"
          />
        ))}
      </div>

      <div className="mt-[30px] flex items-center gap-[10px]">
        <button className="h-[44px] rounded-[5px] bg-[#23A6F0] px-5 text-[14px] font-bold text-white">
          Select Options
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white">
          <Heart size={20} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white">
          <ShoppingCart size={20} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white">
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
}