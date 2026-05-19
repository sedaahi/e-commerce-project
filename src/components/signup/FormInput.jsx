function FormInput({ label, error, rightElement, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-[#252B42]">{label}</label>

      <div className="relative">
        <input
          {...props}
          className={`w-full rounded-md border px-4 py-3 outline-none ${
            error
              ? "border-red-500"
              : "border-[#E6E6E6] focus:border-[#23A6F0]"
          } ${rightElement ? "pr-12" : ""} ${className}`}
        />

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default FormInput;