import React from "react";

const Input = ({
  value,
  onChange,
  placeholder,
  className,
  type,
  name,
  label,
  required = false,
}) => {
  return (
    <div>
      {label && <label className="mb-1 text-gray-200">{label}</label>}
      <input
        value={value}
        onChange={onChange}
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        required={required}
        className={`w-full h-10 px-3 ${
          label && "mt-2"
        } text-white bg-white/20 outline-none rounded-md ${
          value?.length !== 0
            ? "border border-primary-600"
            : "border border-transparent"
        } ${className}`}
      />
    </div>
  );
};

export default Input;
