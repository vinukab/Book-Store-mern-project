import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  register,
  placeholder,
  errors,
}) => {
  const isTextarea = type === "textarea";

  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      {isTextarea ? (
        <textarea
          id={name}
          {...register(name, { required: true })}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out min-h-[120px] placeholder:text-gray-400 text-gray-700"
          placeholder={placeholder}
        />
      ) : (
        <div className="relative">
          {type === "number" && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
          )}
          <input
            id={name}
            type={type}
            {...register(name, { required: true })}
            className={`w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out placeholder:text-gray-400 text-gray-700 ${
              type === "number" ? "pl-8" : ""
            }`}
            placeholder={placeholder}
          />
        </div>
      )}

      {errors && errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[name].message || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default InputField;
