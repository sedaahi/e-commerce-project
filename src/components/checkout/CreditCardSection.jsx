import { useEffect, useState } from "react";
import { CreditCard, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import CardForm from "./CardForm";
import {
  fetchCards,
  removeCard,
  setSelectedCard,
} from "../../store/actions/clientActions";

const maskCardNumber = (cardNo) => {
  if (!cardNo) return "";
  return `${cardNo.slice(0, 4)} **** **** ${cardNo.slice(-4)}`;
};

const getCardType = (cardNo) => {
  if (!cardNo) return "CARD";
  if (cardNo.startsWith("4")) return "VISA";
  if (cardNo.startsWith("5") || cardNo.startsWith("2")) return "MASTERCARD";
  return "CARD";
};

const CardBrandLogo = ({ cardNo }) => {
  const cardType = getCardType(cardNo);

  if (cardType === "VISA") {
    return (
      <div className="rounded-[4px] bg-white/90 px-2 py-1 text-[12px] font-black tracking-[0.12em] text-[#1A4DB3]">
        VISA
      </div>
    );
  }

  if (cardType === "MASTERCARD") {
    return (
      <div className="relative h-[24px] w-[42px]">
        <span className="absolute left-0 top-0 h-[24px] w-[24px] rounded-full bg-[#EB001B]" />
        <span className="absolute right-0 top-0 h-[24px] w-[24px] rounded-full bg-[#F79E1B] opacity-90" />
      </div>
    );
  }

  return (
    <div className="rounded-[4px] bg-white/80 px-2 py-1 text-[11px] font-bold text-[#252B42]">
      CARD
    </div>
  );
};

export default function CreditCardSection() {
  const dispatch = useDispatch();

  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [use3DSecure, setUse3DSecure] = useState(false);

  const creditCards = useSelector((state) => state.client.creditCards);
  const selectedCardId = useSelector((state) => state.client.selectedCardId);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleDeleteCard = async (cardId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card?",
    );

    if (!confirmed) return;

    await dispatch(removeCard(cardId));
  };

  return (
    <section className="rounded-[8px] bg-white p-5 shadow-sm">
      <div className="border-b border-[#ECECEC] pb-5">
        <h2 className="text-[22px] font-bold text-[#252B42]">Payment Method</h2>

        <p className="mt-2 text-[14px] text-[#737373]">
          Select a saved card or add a new card.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-[73%]">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-[20px] font-bold text-[#252B42]">
              Card Information
            </h3>

            <button
              type="button"
              onClick={() => {
                setEditingCard(null);
                setShowCardForm((prev) => !prev);
              }}
              className="text-left text-[14px] font-bold text-[#23A6F0] underline sm:text-right"
            >
              {showCardForm ? "Close Form" : "Add New Card"}
            </button>
          </div>

          {showCardForm && (
            <div className="mb-5">
              <CardForm
                card={editingCard}
                onClose={() => {
                  setShowCardForm(false);
                  setEditingCard(null);
                }}
              />
            </div>
          )}

          {creditCards.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#BDBDBD] bg-[#FAFAFA] p-6 text-center">
              <p className="text-[14px] font-bold text-[#252B42]">
                You do not have a saved card yet.
              </p>
              <p className="mt-2 text-[13px] text-[#737373]">
                Add a new card to continue payment.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {creditCards.map((card) => {
                const isSelected = selectedCardId === card.id;

                return (
                  <div key={card.id} className="w-full lg:w-[calc(50%-8px)]">
                    <div className="mb-3 flex items-center justify-between">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="selectedCard"
                          checked={isSelected}
                          onChange={() => dispatch(setSelectedCard(card.id))}
                          className="h-4 w-4 accent-[#06B6D4]"
                        />

                        <span
                          className={`text-[14px] font-bold ${
                            isSelected ? "text-[#2563EB]" : "text-[#252B42]"
                          }`}
                        >
                          {card.name_on_card}
                        </span>
                      </label>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCard(card);
                            setShowCardForm(true);
                          }}
                          className="group relative rounded-full p-1.5 text-[#2563EB] transition hover:bg-[#EEF6FF]"
                        >
                          <Pencil size={16} />

                          <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-[4px] bg-[#252B42] px-2 py-1 text-[11px] font-bold text-white group-hover:block">
                            Edit
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCard(card.id)}
                          className="group relative rounded-full p-1.5 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />

                          <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-[4px] bg-[#252B42] px-2 py-1 text-[11px] font-bold text-white group-hover:block">
                            Delete
                          </span>
                        </button>
                      </div>
                    </div>

                    <div
                      className={`relative min-h-[185px] rounded-[16px] border p-5 shadow-md transition-all ${
                        isSelected
                          ? "border-[#06B6D4] shadow-[0_20px_60px_rgba(37,99,235,0.25)] bg-gradient-to-br from-[#c2e8f1] via-[#0891B2] to-[#814ae1] text-white"
                          : "border-[#E8E8E8] bg-gradient-to-br from-[#F8FAFC] via-[#EEF6FF] to-[#EDE9FE] text-[#252B42]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard
                          size={30}
                          className={
                            isSelected ? "text-white/90" : "text-[#2563EB]"
                          }
                        />

                        <CardBrandLogo cardNo={card.card_no} />
                      </div>

                      <div className="mt-8">
                        <p
                          className={`text-[11px] font-bold uppercase tracking-[0.08em] ${
                            isSelected ? "text-white/75" : "text-[#8A8A8A]"
                          }`}
                        >
                          Card Holder
                        </p>

                        <p
                          className={`mt-1 text-[15px] font-bold ${
                            isSelected ? "text-white" : "text-[#252B42]"
                          }`}
                        >
                          {card.name_on_card}
                        </p>
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-4">
                        <p
                          className={`text-[15px] font-bold tracking-[0.08em] ${
                            isSelected ? "text-white" : "text-[#252B42]"
                          }`}
                        >
                          {maskCardNumber(card.card_no)}
                        </p>

                        <div className="text-right">
                          <p
                            className={`text-[11px] font-bold uppercase tracking-[0.08em] ${
                              isSelected ? "text-white/75" : "text-[#8A8A8A]"
                            }`}
                          >
                            Valid Thru
                          </p>

                          <p
                            className={`mt-1 text-[14px] font-bold ${
                              isSelected ? "text-white" : "text-[#252B42]"
                            }`}
                          >
                            {card.expire_month}/{card.expire_year}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <label className="mt-6 flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={use3DSecure}
              onChange={(event) => setUse3DSecure(event.target.checked)}
              className="h-5 w-5 accent-[#3692a9]"
            />

            <span className="text-[14px] font-bold text-[#252B42]">
              I want to pay with 3D Secure
            </span>
          </label>
        </div>

        <div className="w-full border-t border-[#ECECEC] pt-5 lg:w-[27%] lg:min-w-[260px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <h3 className="text-[20px] font-bold text-[#252B42]">
            Installment Options
          </h3>

          <p className="mt-2 text-[14px] leading-[20px] text-[#737373]">
            Select an installment option suitable for your card.
          </p>

          <div className="mt-6 overflow-hidden rounded-[8px] border border-[#E8E8E8]">
            <div className="flex bg-[#FAFAFA] text-[14px] font-bold text-[#252B42]">
              <div className="w-1/2 border-r border-[#E8E8E8] p-4">
                Installment Count
              </div>

              <div className="w-1/2 p-4">Monthly Payment</div>
            </div>

            <label className="flex cursor-pointer border-t border-[#E8E8E8] text-[14px] font-bold text-[#E77C40]">
              <div className="flex w-1/2 items-center gap-3 border-r border-[#E8E8E8] p-4">
                <input
                  type="radio"
                  name="installment"
                  defaultChecked
                  className="h-4 w-4 accent-[#E77C40]"
                />
                Single Payment
              </div>

              <div className="w-1/2 p-4">Total Amount</div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
