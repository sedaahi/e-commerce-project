import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

import CartItem from "../components/cart/CartItem";
import CartTotal from "../components/cart/CartTotal";

export default function ShoppingCartPage() {
  const cart = useSelector((state) => state.shoppingCart.cart);

  const cartTotalCount = cart.reduce((total, item) => total + item.count, 0);

  return (
    <main className="w-full bg-[#FAFAFA] py-[40px]">
      <div className="mx-auto max-w-[1050px] px-6 md:px-0">
        <h1 className="text-[24px] font-bold text-[#252B42]">
          Shopping Cart ({cartTotalCount} Products)
        </h1>

        {cart.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-[8px] bg-white p-10 text-center shadow-sm">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#EAF6FF] text-[#23A6F0]">
              <ShoppingCart size={34} />
            </div>

            <h2 className="mt-6 text-[20px] font-bold text-[#252B42]">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-[360px] text-[14px] leading-[22px] text-[#737373]">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex h-[44px] items-center justify-center rounded-[5px] bg-[#23A6F0] px-6 text-[14px] font-bold text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex flex-1 flex-col gap-4">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <CartTotal />
          </div>
        )}
      </div>
    </main>
  );
}