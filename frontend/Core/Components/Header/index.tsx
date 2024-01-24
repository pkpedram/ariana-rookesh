import React, { useMemo, useEffect, useState } from "react";
import { MapStateToProps } from "react-redux";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import { apiConfig } from "../../Redux/constants";
import { PublicState } from "../../Redux/Reducers/reducerTypes";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { publicActions } from "../../Redux/Actions";
import { type } from "os";
import { IoClose, IoMenu } from "react-icons/io5";

export interface HeaderPorps {
  isMobile: boolean;
  layoutType?: number;
  generalSetting: PublicState["generalSetting"];
  handleLanguege: any;
}

const Header = ({
  isMobile,
  layoutType,
  generalSetting,
  handleLanguege,
}: HeaderPorps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = useMemo(() => {
    return [
      {
        title: "محصولات آریانا روکش",
        en_title: "Products",
        link: "/products",
      },
      {
        title: "درباره ما",
        en_title: "About Us",
        link: "/about-us",
      },
      {
        title: "ارتباط با ما",
        en_title: "Contact Us",
        link: "/contact-us",
      },
    ];
  }, []);

  const handleEN = () => {
    let data = localStorage.getItem("lan");
    if (data != "true" || data == undefined) {
      localStorage.setItem("lan", "true");
    } else {
      localStorage.setItem("lan", "false");
    }
    handleLanguege();
  };

  return (
    <>
      <div
        className={`w-full h-screen flex fixed ltr bg-black/40 backdrop-blur z-50 top-0 ${
          mobileMenuOpen ? "left-0" : "left-full"
        } `}
      >
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="h-screen w-1/3"
        ></div>
        <div
          className={`relative w-2/3 delay-200 h-screen bg-black overflow-y-auto flex flex-col gap-6 p-4 ${
            mobileMenuOpen ? " right-0" : " -right-[80%]"
          }`}
        >
          <div className="w-full flex justify-end text-white text-xl mt-4">
            <IoClose onClick={() => setMobileMenuOpen(false)} />
          </div>
          <div className="w-full flex items-center justify-between text-lg pb-4 border-b-2 mb-6  border-white">
            <p className="flex items-center gap-2 text-white ">
              {generalSetting?.phoneNumber}
              <FaPhoneAlt />
            </p>
            <button
              className="text-white text-2xl"
              onClick={() => {
                handleEN();
              }}
            >
              En
            </button>
          </div>
          {items.map((item, idx) => (
            <Link
              onClick={() => setMobileMenuOpen(false)}
              href={item.link}
              passHref
            >
              <p className="text-white">{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`w-full  z-30 px-12 md:px-6 flex justify-center  md:py-6 py-10   ${
          layoutType === 3 || layoutType === 0 || layoutType === 2
            ? "bg-gradient-to-b from-black via-black/65 to-transparent pb-32"
            : "fixed bg-black"
        }`}
      >
        <div className="flex w-full items-center justify-between max-w-[90rem]">
          <div className="flex md:hidden items-center lg:text-xs gap-6">
            <Link href={"/"} className="ml-6">
              <img src={apiConfig.domain + generalSetting?.logo} />
            </Link>
            {items.map((item, idx) => (
              <Link href={item.link} passHref>
                <p className="text-white">{item.title}</p>
              </Link>
            ))}
          </div>
          <div
            onClick={() => {
              setMobileMenuOpen(true);
            }}
            className="hidden flex-1 md:flex  text-white text-3xl"
          >
            <IoMenu />
          </div>
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <Link href={"/"} className="">
              <img src={apiConfig.domain + generalSetting?.logo} />
            </Link>
          </div>
          <div className="flex items-center gap-6 text-white md:flex-1 md:justify-end">
            <p className="flex items-center md:hidden gap-2">
              {generalSetting?.phoneNumber}
              <FaPhoneAlt />
            </p>
            <button
              className="md:hidden"
              onClick={() => {
                handleEN();
              }}
            >
              En
            </button>

            <a
              href={apiConfig.domain + generalSetting?.catalog}
              target="_blank"
              className="text-black bg-white p-3 rounded-lg font-semibold md:text-xs text-xs"
            >
              دانلود کاتالوگ
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
  generalSetting: state.publicState.generalSetting,
  layoutType: state.publicState.layoutType,
});
const mapDispatchToProps = {
  handleLanguege: publicActions.handleLanguege,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
