import React from "react";
import { BiSolidFilePdf, BiSolidImageAlt } from "react-icons/bi";
import { ApiConfig } from "../../redux/constants";
import Button from "../Button";

const PdfInput = ({ value, onChange, name, id, title, deleteFile }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <input
        accept="application/pdf"
        type="file"
        className="hidden"
        name={name}
        onChange={onChange}
        id={id}
      />
      <p className="mb-3 text-primary-550 text-lg">{title}</p>
      <label
        htmlFor={id}
        className={`w-full flex-1  z-10 cursor-pointer justify-center  bg-white/10 min-h-max h-full p-6 rounded-md flex flex-col items-center`}
      >
        {value ? (
          typeof value !== "string" ? (
            <>
              <Button
                className={"z[900]"}
                onClick={() => window.open(URL.createObjectURL(value))}
              >
                دیدن نمونه
              </Button>
              <p className="text-primary-600 mt-3">برای تغییر فایل کنید</p>
            </>
          ) : (
            <>
              <embed
                src={ApiConfig.domain + value}
                className="h-full rounded-md"
              />
              <p className="text-primary-600 mt-3">برای تغییر فایل کنید</p>
            </>
          )
        ) : (
          <>
            <p className="text-primary-600 text-9xl">
              <BiSolidFilePdf />
            </p>
            <p className="text-primary-600">برای انتخاب فایل کلیک کنید</p>
          </>
        )}
      </label>

      {value && (
        <div
          onClick={deleteFile}
          className="w-full mt-2 p-2 bg-red-700 text-white rounded-md text-center cursor-pointer"
        >
          حذف فایل
        </div>
      )}
    </div>
  );
};

export default PdfInput;
