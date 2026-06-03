import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, PackageCheck } from "lucide-react";

import { getOrders } from "../services/orderService";

const formatDate = (date) => {
  return new Date(date).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const maskCardNumber = (cardNo) => {
  const value = String(cardNo || "");
  return `**** **** **** ${value.slice(-4)}`;
};

export default function PreviousOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [openedOrderId, setOpenedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        //orderları yeniden eskiye sırala
        setOrders(
          [...(response.data || [])].sort(
            (a, b) => new Date(b.order_date) - new Date(a.order_date),
          ),
        );
      } catch (error) {
        console.error("Orders could not be fetched:", error);
        setErrorMessage("Orders could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setOpenedOrderId((currentId) => (currentId === orderId ? null : orderId));
  };

  return (
    <main className="min-h-[70vh] w-full bg-[#FAFAFA] py-[40px]">
      <section className="mx-auto max-w-[1180px] px-6 lg:px-0">
        <div className="rounded-[8px] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#ECECEC] pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[26px] font-bold text-[#252B42]">
                Previous Orders
              </h1>

              <p className="mt-2 text-[14px] text-[#737373]">
                You can view your previous orders and order details here.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-[20px] bg-[#EAFBF3] px-4 py-2 text-[#22C55E]">
              <PackageCheck size={18} />
              <span className="text-[13px] font-bold">
                {orders.length} Orders
              </span>
            </div>
          </div>

          {loading && (
            <p className="mt-6 text-[14px] text-[#737373]">Loading orders...</p>
          )}

          {!loading && errorMessage && (
            <p className="mt-6 rounded-[6px] border border-red-200 bg-red-50 p-4 text-[14px] font-bold text-red-500">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && orders.length === 0 && (
            <div className="mt-6 rounded-[8px] border border-dashed border-[#BDBDBD] bg-[#FAFAFA] p-8 text-center">
              <p className="text-[16px] font-bold text-[#252B42]">
                You do not have any previous orders yet.
              </p>
            </div>
          )}

          {!loading && !errorMessage && orders.length > 0 && (
            <div className="mt-6 overflow-hidden rounded-[8px] border border-[#E8E8E8]">
              <div className="hidden bg-[#FAFAFA] text-[14px] font-bold text-[#252B42] md:flex">
                <div className="w-[18%] p-4">Order No</div>
                <div className="w-[22%] p-4">Date</div>
                <div className="w-[20%] p-4">Card</div>
                <div className="w-[20%] p-4">Total</div>
                <div className="w-[20%] p-4 text-right">Details</div>
              </div>

              <div className="flex flex-col">
                {orders.map((order) => {
                  const isOpen = openedOrderId === order.id;

                  return (
                    <div
                      key={order.id}
                      className="border-t border-[#E8E8E8] first:border-t-0"
                    >
                      <button
                        type="button"
                        onClick={() => toggleOrder(order.id)}
                        className="flex w-full flex-col gap-3 p-4 text-left transition hover:bg-[#FAFAFA] md:flex-row md:items-center"
                      >
                        <div className="flex justify-between md:w-[18%] md:block">
                          <span className="text-[13px] font-bold text-[#737373] md:hidden">
                            Order No
                          </span>
                          <span className="text-[14px] font-bold text-[#252B42]">
                            #{order.id}
                          </span>
                          <span className="ml-2 rounded-full bg-[#EAFBF3] px-2 py-1 text-[11px] font-bold text-[#22C55E]">
                            Completed
                          </span>
                        </div>

                        <div className="flex justify-between md:w-[22%] md:block">
                          <span className="text-[13px] font-bold text-[#737373] md:hidden">
                            Date
                          </span>
                          <span className="text-[14px] text-[#737373]">
                            {formatDate(order.order_date)}
                          </span>
                        </div>

                        <div className="flex justify-between md:w-[20%] md:block">
                          <span className="text-[13px] font-bold text-[#737373] md:hidden">
                            Card
                          </span>
                          <span className="text-[14px] text-[#737373]">
                            {maskCardNumber(order.card_no)}
                          </span>
                        </div>

                        <div className="flex justify-between md:w-[20%] md:block">
                          <span className="text-[13px] font-bold text-[#737373] md:hidden">
                            Total
                          </span>
                          <span className="text-[15px] font-bold text-[#E77C40]">
                            ${Number(order.price).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-end md:w-[20%]">
                          <span className="flex items-center gap-1 text-[13px] font-bold text-[#23A6F0]">
                            {isOpen ? "Hide Details" : "View Details"}
                            {isOpen ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </span>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="bg-[#FAFAFA] px-4 pb-5">
                          <div className="rounded-[8px] border border-[#E8E8E8] bg-white p-4">
                            <h2 className="text-[16px] font-bold text-[#252B42]">
                              Order Details
                            </h2>

                            <div className="mt-4 flex flex-col gap-4">
                              {order.products.map((product) => (
                                <div
                                  key={product.id}
                                  className="flex gap-4 border-b border-[#ECECEC] pb-4 last:border-b-0 last:pb-0"
                                >
                                  <img
                                    src={product.images?.[0]?.url}
                                    alt={product.name}
                                    className="h-[80px] w-[80px] rounded-[6px] object-cover"
                                  />

                                  <div className="flex-1">
                                    <h3 className="text-[14px] font-bold text-[#252B42]">
                                      {product.name}
                                    </h3>

                                    <p className="mt-1 line-clamp-2 text-[13px] leading-[20px] text-[#737373]">
                                      {product.description}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-4 text-[13px]">
                                      <span className="text-[#737373]">
                                        Quantity:{" "}
                                        <strong className="text-[#252B42]">
                                          {product.count}
                                        </strong>
                                      </span>

                                      <span className="text-[#737373]">
                                        Unit Price:{" "}
                                        <strong className="text-[#252B42]">
                                          ${Number(product.price).toFixed(2)}
                                        </strong>
                                      </span>

                                      <span className="text-[#737373]">
                                        Subtotal:{" "}
                                        <strong className="text-[#E77C40]">
                                          $
                                          {Number(
                                            product.price * product.count,
                                          ).toFixed(2)}
                                        </strong>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
