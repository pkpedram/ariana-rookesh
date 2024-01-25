import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../Redux/store";
import { Category, ContactUsCategory } from "../../Redux/Reducers/reducerTypes";
import Input from "../Input";
import TextBox from "../TextBox";
import { publicActions } from "../../Redux/Actions";
import Select from "../Select";

const ContactUsForm = ({
  categories,
  postContactUs,
  productCategories,
  lan,
}: {
  categories: Array<ContactUsCategory>;
  postContactUs: Function;
  productCategories: Array<Category>;
  lan: boolean;
}) => {
  const [value, setValue] = useState<any>({
    relatedContactUsFormCategory: categories[0]?._id,
    fullName: "",
    phoneNumber: "",
    companyName: "",
    relatedProductCategory: null,
    message: "",
    isActive: true,
  });

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue({ ...value, [e.target.name]: e.target.value }),
    [value]
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postContactUs(value);
      }}
      className="w-full"
    >
      <div className={`${lan ? "ltr" : ""} w-full flex flex-wrap gap-4`}>
        {categories?.map((cat) => (
          <button
            type="button"
            key={"contactCat" + cat._id}
            onClick={() =>
              setValue({ ...value, relatedContactUsFormCategory: cat._id })
            }
            className={`text-lg ${
              value.relatedContactUsFormCategory === cat._id
                ? "font-bold"
                : "text-gray-400"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
      <div
        className={`${
          lan ? "ltr" : ""
        } w-full grid grid-cols-2 md:grid-cols-1 gap-6 mt-4 mb-6`}
      >
        <Input
          value={value.fullName}
          placeholder={lan ? "Full Name" : "نام و نام خانوادگی"}
          onChange={changeHandler}
          name="fullName"
          dir={lan ? "ltr" : ""}
          style={{
            textAlign: lan ? "left" : "right",
          }}
        />
        <Input
          value={value.companyName}
          placeholder={lan ? "Company Name" : "نام شرکت"}
          onChange={changeHandler}
          name="companyName"
          dir={lan ? "ltr" : ""}
          style={{
            textAlign: lan ? "left" : "right",
          }}
        />
        <Input
          value={value.phoneNumber}
          placeholder={lan ? "Phone Number" : "شماره همراه"}
          onChange={changeHandler}
          name="phoneNumber"
          dir={lan ? "ltr" : ""}
          style={{
            textAlign: lan ? "left" : "right",
          }}
        />
        {/* <Input
          value={value.relatedProductCategory}
          placeholder="گروه محصول"
          onChange={changeHandler}
          name="relatedProductCategory"
        /> */}
        <Select
          title={lan ? "Related Product Category" : "گروه محصول"}
          value={value.relatedProductCategory}
          keyOfOption={lan ? "en_name" : "name"}
          list={productCategories}
          lan={lan}
          valueOfOption="_id"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setValue({
              ...value,
              relatedProductCategory: e.target.value,
            })
          }
        />
      </div>
      <TextBox
        value={value.message}
        placeholder={lan ? "Your Message" : "پیام شما"}
        onChange={(e) => setValue({ ...value, message: e.currentTarget.value })}
        name="relatedProductCategory"
        dir={lan ? "ltr" : ""}
        style={{
          textAlign: lan ? "left" : "right",
        }}
      />
      <div className={`w-full flex ${lan ? "" : "justify-end "} mt-6`}>
        <button
          type="submit"
          className="bg-black p-3 text-white px-8 rounded-lg"
        >
          {lan ? "Submit Form" : "ثبت پیام"}
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  categories: state.publicState.contactUsCategories,
  productCategories: state.productState.categories,
  lan: state.publicState.lan,
});
const mapDispatchToProps = {
  postContactUs: publicActions.postContactUs,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsForm);
