import React, { ChangeEventHandler } from "react";

type selectProps = {
  title: string;
  list: Array<object>;
  keyOfOption: string;
  valueOfOption: string;
  onChange: ChangeEventHandler;
  value?: string;
};

const Select = ({
  title,
  list,
  keyOfOption,
  valueOfOption = "id",
  onChange,
  value,
}: selectProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-white p-2 rounded-lg outline-none cursor-pointer"
    >
      <option value={""}>انتخاب {title}</option>
      {list.map((item: any, idx) => (
        <option key={`${title}__${idx}`} value={item[valueOfOption]}>
          {item[keyOfOption]}
        </option>
      ))}
    </select>
  );
};

export default Select;
