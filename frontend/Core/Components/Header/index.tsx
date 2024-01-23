import React, { useMemo } from "react";
import { MapStateToProps } from "react-redux";
import { RootState } from "../../Redux/store";
import { connect } from "react-redux";
import { apiConfig } from "../../Redux/constants";
import { PublicState } from "../../Redux/Reducers/reducerTypes";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";

export interface HeaderPorps {
  isMobile: boolean;
  layoutType?: number;
  generalSetting: PublicState["generalSetting"];
}

const Header = ({ isMobile, layoutType, generalSetting }: HeaderPorps) => {
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
  return (
    <div
      className={`w-full  z-30 px-12 flex justify-center  py-10  ${
        layoutType === 3 || layoutType === 0 || layoutType === 2
          ? "bg-gradient-to-b from-black via-black/65 to-transparent pb-32"
          : "fixed bg-black"
      }`}
    >
      <div className="flex w-full items-center justify-between max-w-[95rem]">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="ml-6">
            <img src={apiConfig.domain + generalSetting?.logo} />
          </Link>
          {items.map((item, idx) => (
            <Link href={item.link} passHref>
              <p className="text-white">{item.title}</p>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6 text-white">
          <p className="flex items-center gap-2">
            {generalSetting?.phoneNumber}
            <FaPhoneAlt />
          </p>
          <button>En</button>
          <a
            href={apiConfig.domain + generalSetting?.catalog}
            target="_blank"
            className="text-black bg-white p-3 rounded-lg font-semibold text-xs"
          >
            دانلود کاتالوگ
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
  generalSetting: state.publicState.generalSetting,
  layoutType: state.publicState.layoutType,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
