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
}: {
  categories: Array<ContactUsCategory>;
  postContactUs: Function;
  productCategories: Array<Category>;
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
      <div className="w-full flex flex-wrap gap-4">
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
      <div className="w-full grid grid-cols-2 md:grid-cols-1 gap-6 mt-4 mb-6">
        <Input
          value={value.fullName}
          placeholder="نام و نام خانوادگی"
          onChange={changeHandler}
          name="fullName"
        />
        <Input
          value={value.companyName}
          placeholder="نام شرکت"
          onChange={changeHandler}
          name="companyName"
        />
        <Input
          value={value.phoneNumber}
          placeholder="شماره همراه"
          onChange={changeHandler}
          name="phoneNumber"
        />
        {/* <Input
          value={value.relatedProductCategory}
          placeholder="گروه محصول"
          onChange={changeHandler}
          name="relatedProductCategory"
        /> */}
        <Select
          title="گروه محصول"
          value={value.relatedProductCategory}
          keyOfOption="name"
          list={productCategories}
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
        placeholder="پیام شما"
        onChange={(e) => setValue({ ...value, message: e.currentTarget.value })}
        name="relatedProductCategory"
      />
      <div className="w-full flex justify-end mt-6">
        <button
          type="submit"
          className="bg-black p-3 text-white px-8 rounded-lg"
        >
          ثبت پیام
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  categories: state.publicState.contactUsCategories,
  productCategories: state.productState.categories,
});
const mapDispatchToProps = {
  postContactUs: publicActions.postContactUs,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsForm);
