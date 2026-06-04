import { CheckCircle, Handbag, House, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function OrderCompletePage() {
  const location = useLocation();
  const order = location.state?.order;

  const formattedDate = order?.order_date
    ? new Date(order.order_date).toLocaleDateString("tr-TR")
    : "-";

  return (
    <main className="min-h-[70vh] w-full bg-white py-[30px]">
      <section className="mx-auto max-w-[760px] rounded-[12px] bg-white px-6 py-12 text-center">
        <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#EAFBF3] text-[#22C55E]">
          <CheckCircle size={46} />
        </div>

        <h1 className="mt-6 text-[32px] font-bold text-[#252B42]">
          Congratulations! 🎉
        </h1>

        <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[24px] text-[#737373]">
          Your order has been created successfully. Thank you for shopping with
          us.
        </p>

        {order && (
          <div className="mx-auto mt-8 max-w-[460px] rounded-[10px] border border-[#E8E8E8] bg-[#FAFAFA] p-5 text-left">
            <h2 className="text-[18px] font-bold text-[#252B42]">
              Order Details
            </h2>

            <div className="mt-4 flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between gap-4">
                <span className="text-[#737373]">Order Number</span>
                <span className="font-bold text-[#252B42]">#{order.id}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[#737373]">Order Date</span>
                <span className="font-bold text-[#252B42]">
                  {formattedDate}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[#737373]">Payment Card</span>
                <span className="font-bold text-[#252B42]">
                  **** **** **** {String(order.card_no).slice(-4)}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-t border-[#E8E8E8] pt-3">
                <span className="font-bold text-[#252B42]">Total Paid</span>
                <span className="text-[18px] font-bold text-[#E77C40]">
                  ${Number(order.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/orders"
            className="flex h-[44px] items-center justify-center gap-x-2 rounded-[5px] bg-[#47AD97] px-6 text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#3D9884] hover:shadow-md"
          >
            <Handbag size={18} />
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="flex h-[44px] items-center justify-center gap-x-2 rounded-[5px] bg-[#00A1C1] px-6 text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#0089A5] hover:shadow-md"
          >
            <ShoppingCart size={18} />
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="flex h-[44px] items-center justify-center gap-x-2 rounded-[5px] border border-[#E3E2E2] px-6 text-[14px] font-bold text-[#252B42] transition-all duration-200 hover:border-[#D5D5D5] hover:bg-[#F7F7F7] hover:shadow-sm"
          >
            <House size={18} />
            Go to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
