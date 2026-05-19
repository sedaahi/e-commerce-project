import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import { loginUser } from "../store/actions/clientActions";

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const previousPath = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    setLoginError("");

    try {
      await dispatch(loginUser(formData, rememberMe));
      history.push(previousPath);
    } catch (error) {
      setLoginError("The e-mail or password is incorrect. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[420px] flex-col justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-[32px] font-bold text-[#252B42]">Login</h1>
        <p className="mt-2 text-[14px] text-[#737373]">
          Welcome back! Please login to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#252B42]">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email address..."
            className="h-[46px] w-full rounded-[5px] border border-[#E6E6E6] px-4 text-[14px] outline-none focus:border-[#23A6F0]"
            {...register("email", {
              required: "E-mail is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />

          {errors.email && (
            <p className="text-[12px] text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#252B42]">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password...."
              className="h-[46px] w-full rounded-[5px] border border-[#E6E6E6] px-4 pr-11 text-[14px] outline-none focus:border-[#23A6F0]"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373]"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-[12px] text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-[14px] text-[#737373]">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4"
          />
          Remember me
        </label>
        {loginError && (
          <p className="rounded-[5px] bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
            {loginError}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex h-[46px] items-center justify-center rounded-[5px] bg-[#23A6F0] text-[14px] font-bold text-white disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Login"}
        </button>

        <p className="text-center text-[14px] text-[#737373]">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold text-[#23A6F0]">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
