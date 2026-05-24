import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
  toggleCartItem,
} from "../../store/actions/shoppingCartActions";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const product = item.product;
  const productImage = product.images?.[0]?.url;

  return (
    <div className="rounded-[8px] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={() => dispatch(toggleCartItem(product.id))}
            className={`mt-8 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition ${
              item.checked
                ? "border-[#23A6F0] bg-[#23A6F0]"
                : "border-[#BDBDBD] bg-[#FFFDF8]"
            }`}
            aria-label="Select cart item"
          >
            {item.checked && (
              <span className="text-[12px] font-bold leading-none text-white">
                ✓
              </span>
            )}
          </button>
          <img
            src={productImage}
            alt={product.name}
            className="h-[100px] w-[80px] rounded-[6px] object-cover"
          />

          <div>
            <h2 className="text-[15px] font-bold text-[#252B42]">
              {product.name}
            </h2>

            <p className="mt-2 line-clamp-2 text-[13px] text-[#737373]">
              {product.description}
            </p>

            <p className="mt-2 text-[13px] font-bold text-[#23A6F0]">
              Stock: {product.stock}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 md:justify-end">
          <div className="flex items-center rounded-[5px] border border-[#E8E8E8]">
            <button
              type="button"
              onClick={() => dispatch(decreaseCartItem(product.id))}
              className="flex h-[36px] w-[36px] items-center justify-center text-[#737373]"
            >
              <Minus size={16} />
            </button>

            <span className="flex h-[36px] w-[40px] items-center justify-center text-[14px] font-bold text-[#252B42]">
              {item.count}
            </span>

            <button
              type="button"
              onClick={() => dispatch(increaseCartItem(product.id))}
              disabled={item.count >= product.stock}
              className={`flex h-[36px] w-[36px] items-center justify-center ${
                item.count >= product.stock
                  ? "cursor-not-allowed text-[#BDBDBD]"
                  : "text-[#23A6F0]"
              }`}
            >
              <Plus size={16} />
            </button>
          </div>

          <p className="min-w-[90px] text-right text-[16px] font-bold text-[#23856D]">
            ${(product.price * item.count).toFixed(2)}
          </p>

          <button
            type="button"
            onClick={() => dispatch(removeCartItem(product.id))}
            className="text-[#737373] hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
