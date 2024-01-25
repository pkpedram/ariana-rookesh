import React from "react";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
import { connect } from "react-redux";
import { RootState } from "../../Redux/store";
import vectorBlack from "../../../public/assets/image/vectorBlack.svg";
import vectorWhite from "../../../public/assets/image/vectorWhite.svg";
import logo from "../../../public/assets/image/logo.svg";
import logoW from "../../../public/assets/image/logoWhite.svg";
import { ProductState, PublicState } from "../../Redux/Reducers/reducerTypes";
import Link from "next/link";
import { PiPhone } from "react-icons/pi";
import { BsMailbox } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";

const Footer = ({
  layoutType,
  generalSetting,
  categories,
}: {
  layoutType: number;
  generalSetting: PublicState["generalSetting"];
  categories: ProductState["categories"];
}) => {
  return layoutType === 3 ? null : layoutType === 1 ? (
    <>
      <div className="w-full z-30 flex bg-white gap-8 md:flex-col">
        <div className="flex-1 grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-16 p-8">
          <div className="w-full">
            <img src={logo.src} className="h-8" />
            <p className="w-full text-justify mt-4 min-h-[15rem] md:min-h-0 text-sm font-bold">
              {generalSetting.aboutUs}
            </p>
          </div>
          <div className="w-full">
            <div className="h-8 mb-4"></div>
            <h3 className="text-xl font-bold">محصولات</h3>
            <div className="flex flex-col gap-2 mt-4">
              {categories.map((cat) => (
                <Link
                  key={"cat__" + cat._id}
                  className=" text-gray-500 font-bold"
                  href={`/products/${cat.slug}`}
                >
                  <p>{cat.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="h-8 mb-4"></div>
            <h3 className="text-xl font-bold">ارتباط با ما</h3>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 [&>p]:font-bold">
                <PiPhone />
                <p>{generalSetting.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-2 [&>p]:font-bold">
                <BsMailbox />
                <p>{generalSetting.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4  md:w-full md:h-96 lg:w-1/3 relative">
          <img
            src={vectorBlack.src}
            className="h-full w-full z-[1] object-cover object-right absolute top-0 right-0"
          />
          <div className="relative z-[2] w-full py-8 pr-24 pl-4">
            <form className="w-full flex bg-white p-4 rounded-xl">
              <button className="bg-black py-1 px-6 text-white rounded-lg">
                <FaLongArrowAltRight />
              </button>
              <input
                className="w-full  outline-none px-2 text-left"
                type="email"
                placeholder="ایمیل"
                dir="ltr"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-14 flex items-center justify-center bg-black text-white"></div>
    </>
  ) : (
    <>
      <>
        <div className="w-full flex z-30 bg-black gap-8 md:flex-col">
          <div className="w-full grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-16 p-8">
            <div className="w-full">
              <img src={logoW.src} className="h-8" />
              <p className="w-full text-justify mt-4 text-sm min-h-[15rem] md:min-h-0 font-bold text-white">
                {generalSetting.aboutUs}
              </p>
            </div>
            <div className="w-full">
              <div className="h-8 mb-4"></div>
              <h3 className="text-xl font-bold text-white">محصولات</h3>
              <div className="flex flex-col gap-2 mt-4">
                {categories.map((cat) => (
                  <Link
                    key={"cat__" + cat._id}
                    className=" text-gray-500 font-bold "
                    href={`/products/${cat.slug}`}
                  >
                    <p>{cat.name}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="h-8 mb-4"></div>
              <h3 className="text-xl font-bold text-white">ارتباط با ما</h3>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2 [&>p]:font-bold text-white">
                  <PiPhone />
                  <p>{generalSetting.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-2 [&>p]:font-bold text-white">
                  <BsMailbox />
                  <p>{generalSetting.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4  md:w-full md:h-96 lg:w-1/3 relative">
            <img
              src={vectorWhite.src}
              className="h-full w-full object-cover z-[1] absolute object-right top-0 right-0"
            />
            <div className="relative z-[2] w-full py-8 pr-24 pl-4">
              <form className="w-full flex bg-black p-4 rounded-xl">
                <button className="bg-white py-1 px-6 text-black rounded-lg">
                  <FaLongArrowAltRight />
                </button>
                <input
                  className="w-full bg-black text-white outline-none px-2 text-left"
                  type="email"
                  placeholder="ایمیل"
                  dir="ltr"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="w-full h-14 flex items-center z-50 justify-center bg-white text-white"></div>
      </>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  layoutType: state.publicState.layoutType,
  generalSetting: state.publicState.generalSetting,
  categories: state.productState.categories,
});

export default connect(mapStateToProps)(Footer);
