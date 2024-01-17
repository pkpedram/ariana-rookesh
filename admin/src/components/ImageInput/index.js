import React from "react";
import { BiSolidImageAlt } from "react-icons/bi";
import { ApiConfig } from "../../redux/constants";

const ImageInput = ({
  value,
  onChange,
  name,
  id,
  title,
  deleteFile,
  className,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      <input
        type="file"
        className="hidden"
        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
        name={name}
        onChange={onChange}
        id={id}
      />
      <p className="mb-3 text-primary-550 text-lg">{title}</p>
      <label
        htmlFor={id}
        className={`w-full flex-1 ${className} z-10 cursor-pointer justify-center  bg-white/10 min-h-max h-full p-6 rounded-md flex flex-col items-center`}
      >
        {value ? (
          typeof value !== "string" ? (
            <img
              src={URL.createObjectURL(value)}
              className="h-full rounded-md"
            />
          ) : (
            <>
              <img
                src={ApiConfig.domain + value}
                className="h-full rounded-md"
              />
              <p className="text-primary-600 mt-3">برای تغییر کلیک کنید</p>
            </>
          )
        ) : (
          <>
            <p className="text-primary-600 text-9xl">
              <BiSolidImageAlt />
            </p>
            <p className="text-primary-600">برای انتخاب عکس کلیک کنید</p>
          </>
        )}
      </label>

      {value && (
        <div
          onClick={deleteFile}
          className="w-full mt-2 p-2 bg-red-700 text-white rounded-md text-center cursor-pointer"
        >
          حذف عکس
        </div>
      )}
    </div>
  );
};

export default ImageInput;
