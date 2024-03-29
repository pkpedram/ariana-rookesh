import { connect } from "react-redux";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import userActions from "../../redux/actions/User";
import { IoPersonCircle } from "react-icons/io5";
import {
  FaUsers,
  FaWindowMaximize,
  FaCubes,
  FaTextHeight,
  FaBoxOpen,
  FaWpforms,
  FaBookOpen,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiWindows, BiSolidCategory } from "react-icons/bi";
import { PiCodepenLogoBold } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { LuReplace, LuSettings2 } from "react-icons/lu";
import { BsPencilSquare, BsShop } from "react-icons/bs";
import { GrCatalog } from "react-icons/gr";

const SideBar = ({ sidebarOpen, setSidebarOpen, logout, client, userData }) => {
  const location = useLocation();
  const items = [
    {
      link: "/",
      icon: <MdSpaceDashboard />,
      text: "داشبورد",
    },
    {
      link: "/generalSettings",
      icon: <FaWindowMaximize />,
      text: "تنظمیات اصلی",
    },
    {
      link: "/categories",
      icon: <BiSolidCategory />,
      text: "دسته بندی ها",
    },
    {
      link: "/products",
      icon: <FaBoxOpen />,
      text: "محصولات",
    },

    {
      link: "/sellers",
      icon: <BsShop />,
      text: "فروشنده ها",
    },
    {
      link: "/forms",
      icon: <FaWpforms />,
      text: "فرم ها",
    },
    {
      link: "/catalogue",
      icon: <FaBookOpen />,
      text: "کاتالوگ ها",
    },
    {
      link: "/users",
      icon: <FaUsers />,
      text: "ادمین ها",
    },
    {
      link: "/content",
      icon: <BsPencilSquare />,
      text: "محتوا",
    },
    {
      link: "/blog",
      icon: <FaTextHeight />,
      text: "بلاگ",
    },
  ];

  return (
    <div
      className={` bg-gray-900 shadow-xl relative  flex flex-col overflow-x-hidden overflow-scroll ${
        sidebarOpen ? "right-0 p-8 w-72" : "w-0 -right-72"
      }`}
    >
      <div className="flex flex-col items-center py-3 border-b">
        <div className="flex w-full items-center text-gray-200 px-4">
          <p className="text-4xl ml-2">
            <IoPersonCircle />
          </p>
          <p>
            {client
              ? userData?.name
              : `${userData?.firstName} ${userData?.lastName}`}
          </p>
        </div>
      </div>

      <div className="py-4 w-full flex flex-col items-center gap-2">
        {items
          .filter((itm) => itm?.link)
          .map((item) => (
            <Link
              to={item.link}
              className={`flex w-full items-center text-gray-300 p-4 rounded-md hover:text-dark hover:shadow-lg hover:bg-primary-600
                    ${
                      location.pathname == item.link
                        ? "bg-primary-600 !text-dark"
                        : ""
                    }
                    `}
            >
              <p className="text-xl ml-2">{item.icon}</p>
              <p className="">{item.text}</p>
            </Link>
          ))}
      </div>

      <div className="w-full flex items-center border-t py-3">
        <div
          onClick={() => logout()}
          className="w-full cursor-pointer flex items-center  hover:bg-red-600 text-red-600 hover:text-white p-4 rounded-lg"
        >
          <p className="text-xl ml-2">
            <FiLogOut />
          </p>
          <p className="text-lg">خروج</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userState.userData,
});
const mapDispatchToProps = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
