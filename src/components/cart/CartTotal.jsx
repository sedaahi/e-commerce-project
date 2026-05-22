import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartTotal() {
  const cart = useSelector((state) => state.shoppingCart.cart);

  const selectedItems = cart.filter((item) => item.checked);

  const totalCount = selectedItems.reduce(
    (total, item) => total + item.count,
    0,
  );

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );

  return (
    <aside className="w-full rounded-[8px] bg-white p-5 shadow-sm lg:w-[320px]">
      <h2 className="text-[18px] font-bold text-[#252B42]">Cart Total</h2>

      <div className="mt-5 flex flex-col gap-3 border-b border-[#ECECEC] pb-5">
        <div className="flex justify-between text-[14px] text-[#737373]">
          <span>Selected Products</span>
          <span>{totalCount}</span>
        </div>

        <div className="flex justify-between text-[14px] text-[#737373]">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <span className="text-[16px] font-bold text-[#252B42]">Total</span>
        <span className="text-[20px] font-bold text-[#23856D]">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      <Link
        to="/checkout"
        className={`mt-6 flex h-[44px] items-center justify-center rounded-[5px] text-[14px] font-bold text-white ${
          totalCount === 0
            ? "pointer-events-none bg-[#BDBDBD]"
            : "bg-[#23A6F0]"
        }`}
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}