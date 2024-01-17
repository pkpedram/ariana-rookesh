import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Input from "../../components/Input";
import TextBox from "../../components/TextBox";
import ImageInput from "../../components/ImageInput";
import PdfInput from "../../components/PdfInput";
import Button from "../../components/Button";
import { publicActions } from "../../redux/actions";

const GeneralSettings = ({
  generalSettings,
  getGeneralSettings,
  postGeneralSettings,
}) => {
  const [value, setValue] = useState({
    title: "",
    en_title: "",
    phoneNumber: "",
    secondaryColor: "",
    aboutUs: "",
    en_aboutUs: "",
    contactUs: "",
    en_contactUs: "",
    email: "",
    address: "",
    en_address: "",
    logo: null,
    catalog: null,
  });

  const handleChange = useCallback(
    (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
    },
    [value]
  );

  useEffect(() => {
    getGeneralSettings();
  }, []);

  useEffect(() => {
    if (generalSettings[0]?._id) {
      setValue(generalSettings[0]);
    }
  }, [generalSettings]);
  return (
    <div className="w-full">
      <h1 className="text-2xl text-white">تنظیمات اصلی</h1>
      <div className="w-full grid grid-cols-1 place-items-center place-content-center  gap-6 mt-6">
        <div className="w-4/5 rounded-xl bg-gray-800 p-6">
          {/* <h2 className="text-xl text-white mb-4">محتوا</h2> */}
          <div className="w-full grid grid-cols-1 gap-4">
            <div className="w-full grid grid-cols-2 gap-4">
              <Input
                onChange={handleChange}
                value={value.title}
                name={"title"}
                placeholder={"عنوان سایت"}
                label={"عنوان سایت"}
              />
              <Input
                onChange={handleChange}
                value={value.en_title}
                name={"en_title"}
                placeholder={"عنوان انگلیسی"}
                label={" عنوان انگلیسی"}
              />
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
              <Input
                onChange={handleChange}
                value={value.phoneNumber}
                name={"phoneNumber"}
                placeholder={"شماره تماس"}
                label={" شماره تماس"}
              />
              <Input
                onChange={handleChange}
                value={value.email}
                name={"email"}
                placeholder={"ایمیل"}
                label={" ایمیل"}
              />
              <Input
                onChange={handleChange}
                value={value.secondaryColor}
                name={"secondaryColor"}
                placeholder={"رنگ ثانوی"}
                label={" رنگ ثانوی"}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              <TextBox
                onChange={handleChange}
                value={value.address}
                name={"address"}
                placeholder={"آدرس"}
                label={"آدرس"}
              />
              <TextBox
                onChange={handleChange}
                value={value.en_address}
                name={"en_address"}
                placeholder={"آدرس انگلیسی"}
                label={"آدرس انگلیسی"}
              />
              <TextBox
                onChange={handleChange}
                value={value.aboutUs}
                name={"aboutUs"}
                placeholder={"درباره ما کوتاه"}
                label={"درباره ما کوتاه"}
              />
              <TextBox
                onChange={handleChange}
                value={value.en_aboutUs}
                name={"en_aboutUs"}
                placeholder={"درباره ما کوتاه انگلیسی"}
                label={"درباره ما کوتاه انگلیسی"}
              />
              <TextBox
                onChange={handleChange}
                value={value.contactUs}
                name={"contactUs"}
                placeholder={"توضیحات تماس با ما"}
                label={"توضیحات تماس با ما"}
              />
              <TextBox
                onChange={handleChange}
                value={value.en_contactUs}
                name={"en_contactUs"}
                placeholder={"توضیحات تماس با ما انگلیسی"}
                label={"توضیحات تماس با ما انگلیسی"}
              />
              <ImageInput
                id={"image"}
                deleteFile={() => setValue({ ...value, logo: null })}
                onChange={(e) =>
                  setValue({ ...value, logo: e.target.files[0] })
                }
                value={value.logo}
                title={"لوگو"}
              />
              <PdfInput
                deleteFile={() => setValue({ ...value, catalog: null })}
                id={"catalog"}
                title={"کاتالوگ"}
                onChange={(e) =>
                  setValue({ ...value, catalog: e.target.files[0] })
                }
                value={value.catalog}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className={"!w-40"}
                onClick={() => {
                  const formData = new FormData();
                  Object.keys(value).map((item) =>
                    formData.append(item, value[item])
                  );
                  postGeneralSettings(formData);
                }}
              >
                ثبت تغییرات
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  generalSettings: state.publicState.generalSettings,
});
const mapDispatchToProps = {
  getGeneralSettings: publicActions.getGeneralSettings,
  postGeneralSettings: publicActions.postGeneralSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
