import { useState } from "react";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { createCard, editCard } from "../../store/actions/clientActions";

const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

const clearCardNumber = (value) => {
  return value.replace(/\D/g, "");
};

export default function CardForm({ card, onClose }) {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const [showCvvInfo, setShowCvvInfo] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      card_no: card?.card_no ? formatCardNumber(card.card_no) : "",
      name_on_card: card?.name_on_card || "",
      expire_month: card?.expire_month || "",
      expire_year: card?.expire_year || "",
      cvv: "",
    },
  });

  const cardNoValue = watch("card_no");

  const onSubmit = async (formData) => {
    const payload = {
      card_no: clearCardNumber(formData.card_no),
      name_on_card: formData.name_on_card,
      expire_month: Number(formData.expire_month),
      expire_year: Number(formData.expire_year),
    };

    if (card?.id) {
      await dispatch(editCard({ id: card.id, ...payload }));
    } else {
      await dispatch(createCard(payload));
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[8px] border border-[#E8E8E8] bg-[#f7f7f7]"
    >
      <div className="flex items-center justify-between border-b border-[#E8E8E8] bg-[#E8E8E8] px-5 py-4">
        <h2 className="text-[18px] font-bold text-[#252B42]">
          {card?.id ? "Edit Card" : "Card Information"}
        </h2>
      </div>

      <div className="p-5">
        <div>
          <label className="mb-2 block text-[14px] font-bold text-[#252B42]">
            Name on Card
          </label>

          <input
            {...register("name_on_card", {
              required: "Name on card is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            placeholder="Name Surname"
            className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px] outline-none focus:border-[#E77C40]"
          />

          {errors.name_on_card && (
            <p className="mt-1 text-[12px] text-red-500">
              {errors.name_on_card.message}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-[14px] font-bold text-[#252B42]">
            Card Number
          </label>

          <input
            {...register("card_no", {
              required: "Card number is required",
              validate: (value) =>
                clearCardNumber(value).length === 16 ||
                "Card number must be 16 digits",
            })}
            value={cardNoValue}
            onChange={(event) =>
              setValue("card_no", formatCardNumber(event.target.value), {
                shouldValidate: true,
              })
            }
            placeholder="1234 1234 1234 1234"
            inputMode="numeric"
            className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px] outline-none focus:border-[#E77C40]"
          />

          {errors.card_no && (
            <p className="mt-1 text-[12px] text-red-500">
              {errors.card_no.message}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="mb-2 block text-[14px] font-bold text-[#252B42]">
              Expire Month
            </label>

            <select
              {...register("expire_month", {
                required: "Month is required",
              })}
              className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px] text-[#737373] outline-none focus:border-[#E77C40]"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-[14px] font-bold text-[#252B42]">
              Expire Year
            </label>

            <select
              {...register("expire_year", {
                required: "Year is required",
                validate: (value) =>
                  Number(value) >= currentYear || "Card year is expired",
              })}
              className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px] text-[#737373] outline-none focus:border-[#E77C40]"
            >
              <option value="">Year</option>
              {Array.from({ length: 12 }).map((_, index) => {
                const year = currentYear + index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative flex-1">
            <label className="mb-2 flex items-center gap-2 text-[14px] font-bold text-[#252B42]">
              CVV
              <button
                type="button"
                onMouseEnter={() => setShowCvvInfo(true)}
                onMouseLeave={() => setShowCvvInfo(false)}
                onClick={() => setShowCvvInfo((prev) => !prev)}
                className="text-[#E77C40]"
              >
                <Info size={16} />
              </button>
            </label>

            {showCvvInfo && (
              <div className="absolute right-0 top-[28px] z-10 w-[250px] rounded-[6px] border border-[#E8E8E8] bg-white p-3 text-[12px] leading-[18px] text-[#737373] shadow-md">
                <p className="font-bold text-[#252B42]">
                  Security Code (CVV)
                </p>
                <p>
                  The CVV is the 3-digit code on the back of your card.
                </p>
              </div>
            )}

            <input
              {...register("cvv", {
                required: "CVV is required",
                pattern: {
                  value: /^[0-9]{3}$/,
                  message: "CVV must be 3 digits",
                },
              })}
              placeholder="CVV"
              maxLength={3}
              inputMode="numeric"
              onChange={(event) => {
                event.target.value = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 3);
              }}
              className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px] outline-none focus:border-[#E77C40]"
            />

            {errors.cvv && (
              <p className="mt-1 text-[12px] text-red-500">
                {errors.cvv.message}
              </p>
            )}
          </div>
        </div>

        {(errors.expire_month || errors.expire_year) && (
          <p className="mt-2 text-[12px] text-red-500">
            {errors.expire_month?.message || errors.expire_year?.message}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-[42px] rounded-[5px] border border-[#BDBDBD] px-5 text-[14px] font-bold text-[#737373]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[42px] rounded-[5px] bg-[#E77C40] px-5 text-[14px] font-bold text-white disabled:opacity-60"
          >
            {isSubmitting
              ? "Saving..."
              : card?.id
                ? "Update Card"
                : "Save Card"}
          </button>
        </div>
      </div>
    </form>
  );
}