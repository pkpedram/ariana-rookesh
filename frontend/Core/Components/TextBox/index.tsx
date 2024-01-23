import React from "react";

const TextBox = (props: React.HTMLProps<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      className="bg-[#F3F3F3] outline-none placeholder:text-black h-40 rounded-lg p-4 w-full"
    ></textarea>
  );
};

export default TextBox;
