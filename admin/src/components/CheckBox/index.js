import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
const CheckBox = ({ onChange, value }) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
  
      setChecked(value)
    
  }, [value])
  return (
    <div
      className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-all duration-200 border border-gold3F ease-in-out ${
        checked ? "bg-primary-600" : "bg-black32"
      }`}
      onClick={() => {
        setChecked(!checked);
        onChange(!checked);
      }}
    >
      <span
        className={`text-gold3F transition-all duration-200 ease-in-out ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      >
        <BsCheckLg />
      </span>
    </div>
  );
};

export default CheckBox;
