import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderSummary from "../components/cart/OrderSummary";
import AddressForm from "../components/checkout/AddressForm";
import {
  fetchAddresses,
  removeAddress,
  setSelectedAddress,
  setSelectedBillingAddress,
} from "../store/actions/clientActions";

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const { selectedAddressId, selectedBillingAddressId, addressList } =
    useSelector((state) => ({
      selectedAddressId: state.client.selectedAddressId,
      selectedBillingAddressId: state.client.selectedBillingAddressId,
      addressList: state.client.addressList,
    }));

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

  return (
    <main className="w-full bg-[#FAFAFA] py-[40px]">
      <div className="mx-auto flex max-w-[1050px] flex-col gap-6 px-6 lg:flex-row lg:items-start lg:px-0">
        <section className="flex-1 rounded-[8px] bg-white p-6 shadow-sm">
          <h1 className="text-[24px] font-bold text-[#252B42]">
            Address Information
          </h1>

          <p className="mt-2 text-[14px] text-[#737373]">
            Select your delivery address or add a new one.
          </p>

          {/* Delivery Address List */}
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
                    className="mb-4 flex min-h-[90px] w-full flex-col items-center justify-center rounded-[8px] border border-[#23A6F0] bg-[#EAF6FF] text-[#23A6F0]"
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
                  className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-[#BDBDBD] bg-[#FAFAFA] text-[#23A6F0]"
                >
                  <span className="text-[32px] font-bold">+</span>
                  <span className="mt-2 text-[14px] font-bold">
                    Add New Address
                  </span>
                </button>
              )}
            </div>

            {addressList.map((address) => (
              <div
                key={address.id}
                className={`w-full rounded-[8px] border bg-white p-4 transition-all md:w-[calc(50%-8px)] ${
                  selectedAddressId === address.id
                    ? "border-[#23A6F0] shadow-md"
                    : "border-[#E8E8E8]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="shippingAddress"
                      checked={selectedAddressId === address.id}
                      onChange={() => {
                        dispatch(setSelectedAddress(address.id));

                        if (billingSameAsShipping) {
                          dispatch(setSelectedBillingAddress(address.id));
                        }
                      }}
                      className="h-4 w-4 accent-[#23A6F0]"
                    />

                    <span className="text-[13px] font-bold text-[#737373]">
                      Delivery Address
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingAddress(address);
                      setShowAddressForm(true);
                    }}
                    className="text-[13px] font-bold text-[#23A6F0]"
                  >
                    Edit
                  </button>
                </div>

                <h2 className="mt-4 text-[15px] font-bold text-[#252B42]">
                  {address.title}
                </h2>

                <p className="mt-3 text-[14px] font-bold text-[#252B42]">
                  {address.name} {address.surname}
                </p>

                <p className="mt-1 text-[13px] text-[#737373]">
                  {address.phone}
                </p>

                <p className="mt-3 text-[13px] leading-[20px] text-[#737373]">
                  {address.neighborhood}, {address.district}, {address.city}
                </p>

                <button
                  type="button"
                  onClick={() => handleDeleteAddress(address.id)}
                  className="mt-4 rounded-[5px] border border-red-300 px-3 py-2 text-[12px] font-bold text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Billing Same Checkbox */}
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
                  }
                }}
                className="h-4 w-4 accent-[#3895cb]"
              />

              <span className="text-[14px] font-bold text-[#252B42]">
                Billing address is the same as delivery address
              </span>
            </label>
          </div>

          {/* Billing Address List */}
          {!billingSameAsShipping && (
            <div className="mt-6">
              <h2 className="text-[20px] font-bold text-[#252B42]">
                Billing Address
              </h2>

              <p className="mt-2 text-[14px] text-[#737373]">
                Select a billing address for your receipt.
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
                {addressList.map((address) => (
                  <div
                    key={`billing-${address.id}`}
                    className={`w-full rounded-[8px] border bg-white p-4 transition-all md:w-[calc(50%-8px)] ${
                      selectedBillingAddressId === address.id
                        ? "border-[#23A6F0] shadow-md"
                        : "border-[#E8E8E8]"
                    }`}
                  >
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="billingAddress"
                        checked={selectedBillingAddressId === address.id}
                        onChange={() =>
                          dispatch(setSelectedBillingAddress(address.id))
                        }
                        className="h-4 w-4 accent-[#23A6F0]"
                      />

                      <span className="text-[13px] font-bold text-[#737373]">
                        Billing Address
                      </span>
                    </label>

                    <h3 className="mt-4 text-[15px] font-bold text-[#252B42]">
                      {address.title}
                    </h3>

                    <p className="mt-3 text-[14px] font-bold text-[#252B42]">
                      {address.name} {address.surname}
                    </p>

                    <p className="mt-1 text-[13px] text-[#737373]">
                      {address.phone}
                    </p>

                    <p className="mt-3 text-[13px] leading-[20px] text-[#737373]">
                      {address.neighborhood}, {address.district},{" "}
                      {address.city}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <OrderSummary />
      </div>
    </main>
  );
}