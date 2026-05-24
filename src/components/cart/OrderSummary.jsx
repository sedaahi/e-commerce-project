import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OrderSummary() {
  const cart = useSelector((state) => state.shoppingCart.cart);

  const selectedItems = cart.filter((item) => item.checked);

  const totalCount = selectedItems.reduce(
    (total, item) => total + item.count,
    0,
  );

  const productsTotal = selectedItems.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );

  const freeShippingLimit = 150;
  const shippingPayment = totalCount > 0 ? 29.99 : 0;
  const freeShippingDiscount =
    productsTotal >= freeShippingLimit ? shippingPayment : 0;

  const grandTotal = productsTotal + shippingPayment - freeShippingDiscount;

  return (
    <aside className="w-full rounded-[8px] bg-white p-5 shadow-sm lg:w-[320px]">
      <Link
        to={totalCount === 0 ? "#" : "/checkout"}
        type="button"
        disabled={totalCount === 0}
        className={`mb-4 flex h-[44px] w-full items-center justify-center rounded-[5px] text-[14px] font-bold text-white ${
          totalCount === 0 ? "bg-[#BDBDBD]" : "bg-[#23A6F0]"
        }`}
      >
        Create Order
      </Link>

      <div className="rounded-[6px] border border-[#E8E8E8] p-5">
        <h2 className="text-[22px] font-normal text-[#252B42]">
          Order Summary
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex justify-between gap-4 text-[14px] text-[#737373]">
            <span>Products Total</span>
            <span className="font-bold text-[#252B42]">
              ${productsTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-[14px] text-[#737373]">
            <span>Shipping Payment</span>
            <span className="font-bold text-[#252B42]">
              ${shippingPayment.toFixed(2)}
            </span>
          </div>

          {freeShippingDiscount > 0 && (
            <div className="flex justify-between gap-4 text-[14px] text-[#737373]">
              <span>150+ Free Shipping Discount</span>
              <span className="font-bold text-[#E77C40]">
                -${freeShippingDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {totalCount > 0 && productsTotal < freeShippingLimit && (
            <p className="rounded-[5px] bg-[#FFF4E8] px-3 py-2 text-[12px] leading-[18px] text-[#737373]">
              Add ${(freeShippingLimit - productsTotal).toFixed(2)} more for
              free shipping.
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-[#ECECEC] pt-4">
          <div className="flex justify-between">
            <span className="text-[16px] font-bold text-[#252B42]">
              Grand Total
            </span>

            <span className="text-[20px] font-bold text-[#E77C40]">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Link
        to={totalCount === 0 ? "#" : "/checkout"}
        className={`mb-4 flex h-[44px] w-full items-center justify-center rounded-[5px] text-[14px] font-bold text-white ${
          totalCount === 0 ? "pointer-events-none bg-[#BDBDBD]" : "bg-[#23A6F0]"
        }`}
      >
        Create Order
      </Link>
    </aside>
  );
}
