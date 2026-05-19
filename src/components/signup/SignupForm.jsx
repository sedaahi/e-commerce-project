import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import FormInput from "./FormInput";
import { signup } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { fetchRolesIfNeeded } from "../../store/actions/clientActions";

function SignupForm() {
  const history = useHistory();

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.client.roles);

  const [submitError, setSubmitError] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      role_id: "3",
    },
  });

  const selectedRoleId = watch("role_id");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isStoreSelected = selectedRoleId === "2";

  useEffect(() => {
    dispatch(fetchRolesIfNeeded())
      .then(() => {
        setValue("role_id", "3");
      })
      .catch(() => {
        setSubmitError("Roles could not be loaded.");
        toast.error("Roles could not be loaded.");
      });
  }, [dispatch, setValue]);

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  useEffect(() => {
    if (!isStoreSelected) {
      resetField("storeName");
      resetField("storePhone");
      resetField("storeTaxNo");
      resetField("storeBankAccount");
    }
  }, [isStoreSelected, resetField]);

  const onSubmit = (formData) => {
    setSubmitError("");
    setIsSubmittingForm(true);

    const requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: Number(formData.role_id),
    };

    if (formData.role_id === "2") {
      requestData.store = {
        name: formData.storeName,
        phone: formData.storePhone,
        tax_no: formData.storeTaxNo,
        bank_account: formData.storeBankAccount,
      };
    }

    api;
    signup(requestData)
      .then(() => {
        reset();

        toast.success(
          "Account created! Please activate your account via email.",
        );

        setTimeout(() => {
          history.goBack();
        }, 1500);
      })
      .catch((error) => {
        const backendError = error.response?.data;

        if (backendError?.err?.code === "SQLITE_CONSTRAINT") {
          const duplicateMessage =
            "This email is already registered with another account.";

          setSubmitError(duplicateMessage);
          toast.error(duplicateMessage);

          return;
        }

        const message =
          backendError?.message ||
          "Signup failed. Please check your information.";

        setSubmitError(message);
        toast.error(message);
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  };

  return (
    <main className="bg-[#FAFAFA] px-6 py-[60px]">
      <div className="mx-auto max-w-[520px] rounded-[10px] bg-white p-6 shadow-sm md:p-10">
        <h1 className="mb-8 text-center text-[32px] font-bold text-[#252B42]">
          Sign Up
        </h1>

        {submitError && (
          <p className="mb-5 rounded-md bg-red-100 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormInput
            label="Name"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required.",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters.",
              },
            })}
          />

          <FormInput
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required.",
              setValueAs: (value) => value.toLowerCase(),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email.",
              },
            })}
          />

          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[#737373]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
            {...register("password", {
              required: "Password is required.",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number and special character.",
              },
            })}
          />
          <FormInput
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            error={errors.confirmPassword?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-[#737373]"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === password || "Passwords do not match.",
            })}
          />

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#252B42]">Role</label>

            <select
              className={`rounded-md border px-4 py-3 outline-none ${
                errors.role_id
                  ? "border-red-500"
                  : "border-[#E6E6E6] focus:border-[#23A6F0]"
              }`}
              {...register("role_id", {
                required: "Role is required.",
              })}
            >
              {roles.map((role) => (
                <option key={role.id} value={String(role.id)}>
                  {role.name}
                </option>
              ))}
            </select>

            {errors.role_id && (
              <p className="text-sm text-red-600">{errors.role_id.message}</p>
            )}
          </div>

          {isStoreSelected && (
            <div className="flex flex-col gap-5 rounded-[10px] border border-[#E6E6E6] p-5">
              <h3 className="text-[20px] font-bold text-[#252B42]">
                Store Information
              </h3>

              <FormInput
                label="Store Name"
                placeholder="Store name"
                error={errors.storeName?.message}
                {...register("storeName", {
                  required: "Store name is required.",
                  minLength: {
                    value: 3,
                    message: "Store name must be at least 3 characters.",
                  },
                })}
              />

              <FormInput
                label="Store Phone"
                placeholder="05XXXXXXXXX"
                maxLength={11}
                inputMode="numeric"
                error={errors.storePhone?.message}
                {...register("storePhone", {
                  required: "Store phone is required.",
                  onChange: (event) => {
                    event.target.value = event.target.value.replace(/\D/g, "");
                  },
                  pattern: {
                    value: /^0?5\d{9}$/,
                    message: "Please enter a valid Türkiye phone number.",
                  },
                })}
              />

              <FormInput
                label="Store Tax ID"
                placeholder="T1234V123456"
                error={errors.storeTaxNo?.message}
                {...register("storeTaxNo", {
                  required: "Store tax ID is required.",
                  setValueAs: (value) => value.toUpperCase(),
                  pattern: {
                    value: /^T\d{4}V\d{6}$/,
                    message: "Tax ID must match TXXXXVXXXXXX format.",
                  },
                })}
              />

              <FormInput
                label="Store Bank Account"
                placeholder="TR..."
                error={errors.storeBankAccount?.message}
                {...register("storeBankAccount", {
                  required: "IBAN is required.",
                  onChange: (event) => {
                    event.target.value = event.target.value
                      .replace(/\s/g, "")
                      .toUpperCase();
                  },
                  pattern: {
                    value: /^TR\d{24}$/,
                    message: "Please enter a valid Türkiye IBAN.",
                  },
                })}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmittingForm}
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-[#23A6F0] px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmittingForm && (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}

            {isSubmittingForm ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignupForm;
