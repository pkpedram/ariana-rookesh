import React from "react";
import { connect } from "react-redux";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import Input from "../Input";
import productActions from "../../redux/actions/Products";
import Button from "../Button";

const HotOffer = ({ hotOffer, setHotOffer, edit, addHotOffer }) => {
  const CostumeDatePickerInput = ({
    openCalendar,
    value,
    handleValueChange,
    title,
  }) => {
    return (
      <Input
        onFocus={openCalendar}
        value={value}
        onChange={handleValueChange}
        label={title}
        className="border border-gold3F p-2 bg-transparent px-2 text-white rounded outline-none w-full"
      />
    );
  };
  return (
    <div className="w-full p-6 rounded-lg bg-gray-800 mt-8">
      <h1 className="text-white text-xl"> افزودن به پیشنهاد ویژه</h1>
      <div className="grid grid-cols-3 gap-2 w-full mt-4">
        <DatePicker
          // value={new Date(valuetimers.fromDate)}
          calendar={persian}
          format="YYYY/MM/DD"
          locale={persian_fa}
          value={hotOffer.from_date}
          render={
            <CostumeDatePickerInput
              title="از تاریخ"
              handleValueChange={(e) => console.log("Date Input", e)}
            />
          }
          className={`border-1 rmdp-mobile rmdp-filter green bg-dark`}
          onChange={(e) => setHotOffer({ ...hotOffer, from_date: new Date(e) })}
        />

        <DatePicker
          // value={new Date(valuetimers.fromDate)}
          calendar={persian}
          format="YYYY/MM/DD"
          locale={persian_fa}
          value={hotOffer.to_date}
          render={
            <CostumeDatePickerInput
              title="تا تاریخ"
              handleValueChange={(e) => console.log("Date Input", e)}
            />
          }
          className={`border-1 rmdp-mobile rmdp-filter green bg-dark`}
          onChange={(e) => setHotOffer({ ...hotOffer, to_date: new Date(e) })}
        />

        <Input
          label={"قیمت با تخفیف"}
          value={hotOffer?.offerPrice}
          onChange={(e) =>
            setHotOffer({ ...hotOffer, offerPrice: e.target.value })
          }
        />
      </div>
      {edit && (
        <div className="w-full flex justify-end mt-4">
          <Button
            className={"w-max px-8"}
            onClick={() => {
              addHotOffer({ ...hotOffer, relatedProduct: edit });
            }}
          >
            {" "}
            ثبت تغییرات
          </Button>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = { addHotOffer: productActions.addHotOffer };

export default connect(mapStateToProps, mapDispatchToProps)(HotOffer);
