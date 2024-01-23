import React, { HTMLAttributes } from "react";

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="bg-[#F3F3F3] outline-none placeholder:text-black h-14 rounded-lg px-4 w-full"
    />
  );
};

export default Input;
