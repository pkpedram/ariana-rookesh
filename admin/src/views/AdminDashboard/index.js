import React, { useEffect } from "react";
import { connect } from "react-redux";
import { publicActions } from "../../redux/actions";
import { IoPersonCircle } from "react-icons/io5";
import { FaUsers, FaWindowMaximize, FaCubes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiWindows, BiSolidCategory } from "react-icons/bi";
import { PiCodepenLogoBold } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { TbTexture } from "react-icons/tb";
import { GiSixEyes } from "react-icons/gi";
import NotificationItem from "../../components/NotificationItem";
import Chart from "../../components/Chart";

const AdminDashboard = ({
  getGeneralStats,
  generalStats,
  getNotifications,
  notificationList,
}) => {
  useEffect(() => {
    getGeneralStats();
    getNotifications();
  }, []);

  let generalData = [
    {
      icon: <FaUsers />,
      title: "کاربر",
      count: generalStats?.userCount,
    },
    {
      icon: <BiWindows />,
      title: "فرم پر شده تماس",
      count: generalStats?.contactUsCount,
    },
    {
      icon: <PiCodepenLogoBold />,
      title: "محصول",
      count: generalStats?.productsCount,
    },
    {
      icon: <FaCubes />,
      title: "پست بلاگ",
      count: generalStats?.blogPostCount,
    },
    {
      icon: <GiSixEyes />,
      title: "بازدید کل",
      count: generalStats?.seenCount,
    },
  ];

  return (
    <div className="w-full flex items-center flex-col">
      <div className="w-full grid grid-cols-5 gap-4">
        {generalData?.map((item) => (
          <div className="w-full px-8 py-6 rounded-md shadow-xl bg-primary-600 flex items-center justify-center gap-2">
            <p className="text-xl">{item.icon}</p>
            <p>{item.count?.toLocaleString("fa-ir")} عدد</p>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="w-full mt-8 flex gap-4 h-full flex-1">
        <div className="w-full p-3 rounded-lg bg-gray-950 shadow-lg">
          <h1 className="text-lg text-primary-600 mb-6">پیام ها</h1>
          <div className="w-full flex flex-col gap-3">
            {notificationList?.map((item) => (
              <NotificationItem item={item} />
            ))}
          </div>
        </div>
        <Chart name={"بازدید"} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  generalStats: state.publicState.generalStats,
  notificationList: state.publicState.notificationList,
});
const mapDispatchToProps = {
  getGeneralStats: publicActions.getGeneralStats,
  getNotifications: publicActions.getNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
