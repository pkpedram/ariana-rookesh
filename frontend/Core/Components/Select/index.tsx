import React, { ChangeEventHandler } from "react";

type selectProps = {
  title: string;
  list: Array<object>;
  keyOfOption: string;
  valueOfOption: string;
  onChange: ChangeEventHandler;
  value?: string;
  lan?: boolean;
};

const Select = ({
  title,
  list,
  keyOfOption,
  valueOfOption = "_id",
  onChange,
  value,
  lan = false,
}: selectProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`${
        lan ? "ltr text-left" : ""
      } w-full bg-[#F3F3F3] p-2 rounded-lg outline-none cursor-pointer`}
    >
      <option value={""}>
        {lan ? "Choose" : "انتخاب"} {title}
      </option>
      {list.map((item: any, idx) => (
        <option key={`${title}__${idx}`} value={item[valueOfOption]}>
          {item[keyOfOption]}
        </option>
      ))}
    </select>
  );
};

export default Select;
