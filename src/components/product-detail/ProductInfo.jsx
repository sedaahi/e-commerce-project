import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../../store/actions/shoppingCartActions";

const colorOptions = ["#23A6F0", "#2DC071", "#E77C40", "#252B42"];

export default function ProductInfo({ product }) {
  const dispatch = useDispatch();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

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
              fill={
                index < Math.round(product.rating) ? "currentColor" : "none"
              }
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
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex h-[44px] items-center justify-center gap-2 rounded-[5px] px-5 text-[14px] font-bold transition-all duration-300 ${
            added
              ? "bg-[#737373] text-white hover:bg-[#737373]"
              : "bg-[#23A6F0] text-white hover:bg-[#1b8ed1]"
          }`}
        >
          {added ? (
            "✓ Added!"
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white">
          <Heart size={20} />
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white"
        >
          <ShoppingCart size={20} />
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white">
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
}
