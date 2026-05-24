import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { createAddress, editAddress } from "../../store/actions/clientActions";

const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya"];

export default function AddressForm({ address, onClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: address?.title || "",
      name: address?.name || "",
      surname: address?.surname || "",
      phone: address?.phone || "",
      city: address?.city || "",
      district: address?.district || "",
      neighborhood: address?.neighborhood || "",
      address: address?.address || "",
    },
  });

  const onSubmit = async (formData) => {
    if (address?.id) {
      await dispatch(
        editAddress({
          id: address.id,
          ...formData,
        }),
      );
    } else {
      await dispatch(createAddress(formData));
    }

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[8px] border border-[#E8E8E8] bg-white p-5"
    >
      <h2 className="text-[18px] font-bold text-[#252B42]">
        {address?.id ? "Edit Address" : "Add New Address"}
      </h2>

      <div className="mt-5 flex flex-col gap-4">
        <input
          {...register("title", { required: "Address title is required" })}
          placeholder="Address Title"
          className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px]"
        />
        {errors.title && (
          <p className="text-[12px] text-red-500">{errors.title.message}</p>
        )}

        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px]"
        />
        {errors.name && (
          <p className="text-[12px] text-red-500">{errors.name.message}</p>
        )}

        <input
          {...register("surname", { required: "Surname is required" })}
          placeholder="Surname"
          className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px]"
        />
        {errors.surname && (
          <p className="text-[12px] text-red-500">{errors.surname.message}</p>
        )}

        <div className="flex gap-2">
          <input
            {...register("phone", { required: "Phone is required" })}
            placeholder="05XXXXXXXXX"
            className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px]"
          />
        </div>
        {errors.phone && (
          <p className="text-[12px] text-red-500">{errors.phone.message}</p>
        )}

        <select
          {...register("city", { required: "City is required" })}
          className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px] text-[#737373]"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city.toLowerCase()}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && (
          <p className="text-[12px] text-red-500">{errors.city.message}</p>
        )}

        <input
          {...register("district", { required: "District is required" })}
          placeholder="District"
          className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px]"
        />
        {errors.district && (
          <p className="text-[12px] text-red-500">{errors.district.message}</p>
        )}

        <input
          {...register("neighborhood", {
            required: "Neighborhood is required",
          })}
          placeholder="Neighborhood"
          className="h-[44px] w-full rounded-[5px] border border-[#E8E8E8] px-4 text-[14px]"
        />
        {errors.neighborhood && (
          <p className="text-[12px] text-red-500">
            {errors.neighborhood.message}
          </p>
        )}

        <textarea
          {...register("address", { required: "Address is required" })}
          placeholder="Address details"
          rows={4}
          className="w-full rounded-[5px] border border-[#E8E8E8] px-4 py-3 text-[14px]"
        />
        {errors.address && (
          <p className="text-[12px] text-red-500">{errors.address.message}</p>
        )}
      </div>

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
          className="h-[42px] rounded-[5px] bg-[#23A6F0] px-5 text-[14px] font-bold text-white disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : address?.id
              ? "Update Address"
              : "Save Address"}
        </button>
      </div>
    </form>
  );
}
