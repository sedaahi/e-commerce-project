import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrderRequest } from "../services/orderService";

import OrderSummary from "../components/cart/OrderSummary";
import AddressForm from "../components/checkout/AddressForm";
import CreditCardSection from "../components/checkout/CreditCardSection";

import {
  fetchAddresses,
  removeAddress,
  setSelectedAddress,
  setSelectedBillingAddress,
} from "../store/actions/clientActions";
import { clearCart } from "../store/actions/shoppingCartActions";

import { toast } from "react-toastify";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState("address");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [cardCvv, setCardCvv] = useState("");

  const {
    selectedAddressId,
    selectedBillingAddressId,
    selectedCardId,
    addressList,
    creditCards,
  } = useSelector((state) => state.client);

  const cart = useSelector((state) => state.shoppingCart.cart);

  const selectedAddress = addressList.find(
    (address) => address.id === selectedAddressId,
  );

  const selectedBillingAddress = addressList.find(
    (address) => address.id === selectedBillingAddressId,
  );
  const selectedCard = creditCards.find((card) => card.id === selectedCardId);

  const selectedItems = cart.filter((item) => item.checked);

  const productsTotal = selectedItems.reduce(
    (total, item) => total + item.product.price * item.count,
    0,
  );

  const shippingPayment = selectedItems.length > 0 ? 29.99 : 0;
  const freeShippingDiscount = productsTotal >= 150 ? shippingPayment : 0;
  const grandTotal = productsTotal + shippingPayment - freeShippingDiscount;

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleDeleteAddress = async (addressId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    await dispatch(removeAddress(addressId));
  };

  const handleSelectShippingAddress = (addressId) => {
    dispatch(setSelectedAddress(addressId));

    if (billingSameAsShipping) {
      dispatch(setSelectedBillingAddress(addressId));
    }
  };

  const handleContinueToPayment = () => {
    if (!selectedAddressId) return;

    if (billingSameAsShipping) {
      dispatch(setSelectedBillingAddress(selectedAddressId));
    }

    setActiveStep("payment");
  };

  const handlePayClick = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address.");
      setActiveStep("address");
      return;
    }

    if (!selectedCard) {
      toast.error("Please select a payment card.");
      return;
    }

    if (cardCvv.length !== 3) {
      toast.error("Please enter a valid CVV.");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    const orderData = {
      address_id: Number(selectedAddressId),
      order_date: new Date().toISOString(),
      card_no: String(selectedCard.card_no),
      card_name: selectedCard.name_on_card,
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(cardCvv),
      price: Number(grandTotal.toFixed(2)),
      products: selectedItems.map((item) => ({
        product_id: Number(item.product.id),
        count: Number(item.count),
        detail: item.product.name,
      })),
    };

    try {
      const response = await createOrderRequest(orderData);

      setCardCvv("");
      dispatch(clearCart());
      toast.success("Order created successfully.");

      history.push({
        pathname: "/order-complete",
        state: {
          order: response.data, //resp order success sayfasına yönlendir
        },
      });
    } catch (error) {
      toast.error("Order could not be created.");
      console.error("Order create failed:", error);
    }
  };

  const renderAddressCard = (address, type = "shipping") => {
    const isShipping = type === "shipping";
    const checked = isShipping
      ? selectedAddressId === address.id
      : selectedBillingAddressId === address.id;

    return (
      <div
        key={`${type}-${address.id}`}
        className={`w-full rounded-[8px] border bg-white p-4 transition-all md:w-[calc(50%-8px)] ${
          checked ? "border-[#E77C40] shadow-md" : "border-[#E8E8E8]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={isShipping ? "shippingAddress" : "billingAddress"}
              checked={checked}
              onChange={() =>
                isShipping
                  ? handleSelectShippingAddress(address.id)
                  : dispatch(setSelectedBillingAddress(address.id))
              }
              className="h-4 w-4 accent-[#E77C40]"
            />

            <span className="text-[13px] font-bold text-[#737373]">
              {isShipping ? "Delivery Address" : "Billing Address"}
            </span>
          </label>

          {isShipping && (
            <button
              type="button"
              onClick={() => {
                setEditingAddress(address);
                setShowAddressForm(true);
              }}
              className="text-[13px] font-bold text-[#E77C40]"
            >
              Edit
            </button>
          )}
        </div>

        <h2 className="mt-4 text-[15px] font-bold text-[#252B42]">
          {address.title}
        </h2>

        <p className="mt-3 text-[14px] font-bold text-[#252B42]">
          {address.name} {address.surname}
        </p>

        <p className="mt-1 text-[13px] text-[#737373]">{address.phone}</p>

        <p className="mt-3 text-[13px] leading-[20px] text-[#737373]">
          {address.neighborhood}, {address.district}, {address.city}
        </p>

        {isShipping && (
          <button
            type="button"
            onClick={() => handleDeleteAddress(address.id)}
            className="mt-4 rounded-[5px] border border-red-300 px-3 py-2 text-[12px] font-bold text-red-500"
          >
            Delete
          </button>
        )}
      </div>
    );
  };

  const renderAddressStep = () => (
    <section className="rounded-[8px] bg-white p-6 shadow-sm">
      <h1 className="text-[24px] font-bold text-[#252B42]">
        Address Information
      </h1>

      <p className="mt-2 text-[14px] text-[#737373]">
        Select your delivery address or add a new one.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="w-full md:w-[calc(50%-8px)]">
          {showAddressForm ? (
            <div>
              <button
                type="button"
                onClick={() => {
                  setShowAddressForm(false);
                  setEditingAddress(null);
                }}
                className="mb-4 flex min-h-[90px] w-full flex-col items-center justify-center rounded-[8px] border border-[#E77C40] bg-[#FFF4E8] text-[#E77C40]"
              >
                <span className="text-[28px] font-bold">−</span>
                <span className="mt-1 text-[14px] font-bold">
                  Close Address Form
                </span>
              </button>

              <AddressForm
                address={editingAddress}
                onClose={() => {
                  setShowAddressForm(false);
                  setEditingAddress(null);
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditingAddress(null);
                setShowAddressForm(true);
              }}
              className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-[#BDBDBD] bg-[#FAFAFA] text-[#E77C40]"
            >
              <span className="text-[32px] font-bold">+</span>
              <span className="mt-2 text-[14px] font-bold">
                Add New Address
              </span>
            </button>
          )}
        </div>

        {addressList.map((address) => renderAddressCard(address))}
      </div>

      <div className="mt-6 rounded-[8px] border border-[#E8E8E8] bg-[#FAFAFA] p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={billingSameAsShipping}
            onChange={(event) => {
              const checked = event.target.checked;
              setBillingSameAsShipping(checked);

              if (checked) {
                dispatch(setSelectedBillingAddress(selectedAddressId));
              } else {
                dispatch(setSelectedBillingAddress(null));
              }
            }}
            className="h-4 w-4 accent-[#E77C40]"
          />

          <span className="text-[14px] font-bold text-[#252B42]">
            Billing address is the same as delivery address
          </span>
        </label>
      </div>

      {!billingSameAsShipping && (
        <div className="mt-6">
          <h2 className="text-[20px] font-bold text-[#252B42]">
            Billing Address
          </h2>

          <p className="mt-2 text-[14px] text-[#737373]">
            Select a billing address for your receipt.
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            {addressList.map((address) =>
              renderAddressCard(address, "billing"),
            )}
          </div>
        </div>
      )}
    </section>
  );

  const renderPaymentStep = () => (
    <div className="flex flex-col gap-6">
      <section className="rounded-[8px] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-[#252B42]">
              Address Information
            </h2>

            {selectedAddress ? (
              <div className="mt-3 text-[14px] leading-[22px] text-[#737373]">
                <p className="font-bold text-[#252B42]">
                  {selectedAddress.title}
                </p>
                <p>
                  {selectedAddress.neighborhood}, {selectedAddress.district},{" "}
                  {selectedAddress.city}
                </p>
                <p>
                  {selectedAddress.name} {selectedAddress.surname} -{" "}
                  {selectedAddress.phone}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-[14px] text-red-500">
                Please select a delivery address.
              </p>
            )}

            {!billingSameAsShipping && selectedBillingAddress && (
              <div className="mt-4 text-[14px] leading-[22px] text-[#737373]">
                <p className="font-bold text-[#252B42]">Billing Address</p>
                <p>
                  {selectedBillingAddress.neighborhood},{" "}
                  {selectedBillingAddress.district},{" "}
                  {selectedBillingAddress.city}
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveStep("address")}
            className="text-left text-[14px] font-bold text-[#E77C40] underline md:text-right"
          >
            Change
          </button>
        </div>
      </section>

      <CreditCardSection cardCvv={cardCvv} setCardCvv={setCardCvv} />
    </div>
  );

  return (
    <main className="w-full bg-[#FAFAFA] py-[40px]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-6 lg:flex-row lg:items-start lg:px-0">
        <div className="flex-1">
          <div className="mb-6 flex flex-col overflow-hidden rounded-[8px] border border-[#E8E8E8] bg-white shadow-sm md:flex-row">
            <button
              type="button"
              onClick={() => setActiveStep("address")}
              className={`flex-1 border-b px-6 py-5 text-left md:border-b-0 md:border-r ${
                activeStep === "address"
                  ? "border-b-[3px] border-b-[#E77C40] bg-white"
                  : "border-[#E8E8E8] bg-[#FAFAFA]"
              }`}
            >
              <span className="text-[22px] font-bold text-[#E77C40]">1</span>
              <span className="ml-3 text-[20px] font-bold text-[#252B42]">
                Address Information
              </span>
            </button>

            <button
              type="button"
              onClick={() => selectedAddressId && setActiveStep("payment")}
              className={`flex-1 px-6 py-5 text-left ${
                activeStep === "payment"
                  ? "border-b-[3px] border-b-[#E77C40] bg-white"
                  : "bg-[#FAFAFA]"
              } ${!selectedAddressId ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <span className="text-[22px] font-bold text-[#E77C40]">2</span>
              <span className="ml-3 text-[20px] font-bold text-[#252B42]">
                Payment Options
              </span>
            </button>
          </div>

          {activeStep === "address" ? renderAddressStep() : renderPaymentStep()}
        </div>

        <OrderSummary
          buttonText={activeStep === "address" ? "Continue to Payment" : "Pay"}
          onButtonClick={
            activeStep === "address" ? handleContinueToPayment : handlePayClick
          }
          disabled={
            activeStep === "address"
              ? !selectedAddressId ||
                (!billingSameAsShipping && !selectedBillingAddressId)
              : !selectedCardId || cardCvv.length !== 3
          }
        />
      </div>
    </main>
  );
}
