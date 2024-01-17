import React from "react";

const TextBox = ({ value, onChange, placeholder, name, className, label }) => {
  return (
    <div>
      {label && <label className="mb-1 text-gray-200">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`w-full h-40 p-3 ${
          label && "mt-2"
        } text-white bg-white/20 outline-none rounded-md ${
          value?.length !== 0
            ? "border border-primary-600"
            : "border border-transparent"
        } ${className}`}
      ></textarea>
    </div>
  );
};

export default TextBox;
