import Link from "next/link";
import React from "react";
import { PiListBulletsBold } from "react-icons/pi";
import { BsChevronDown } from "react-icons/bs";
import { BiBookAlt } from "react-icons/bi";
import { CiHeadphones } from "react-icons/ci";
import { IoInfiniteOutline } from "react-icons/io5";

const HeaderBottom = () => {
  const headerItems = [
    {
      title: "چاپی",
      link: "https://taaghche.com/physicalbook?utm_source=Taaghche&utm_medium=Menu&utm_campaign=ChaapiNavMenu",
      icon: <BiBookAlt />,
    },
    {
      title: "صوتی",
      link: "https://taaghche.com/audiobook?utm_source=Taaghche&utm_medium=Menu&utm_campaign=AudioNavMenu",
      icon: <CiHeadphones />,
    },
    {
      title: "اشتراک بینهایت",
      link: "https://taaghche.com/subscription?utm_source=Taaghche&utm_medium=Menu&utm_campaign=InfiniteNavMenu",
      icon: <IoInfiniteOutline />,
    },
  ];

  return (
    <div className="w-full max-w-[75rem] flex items-center gap-8 justify-between">
      <div className="w-full flex items-cnter gap-6">
        <div className="flex items-center gap-2 cursor-pointer">
          <p className="text-xl">
            <PiListBulletsBold />
          </p>
          <p>دسته بندی ها</p>
          <p>
            <BsChevronDown />
          </p>
        </div>

        {headerItems.map((item, idx) => (
          <Link href={item.link} key={`HEADER_ITEM_${idx}`}>
            <div className="flex items-center gap-2">
              <p className="text-xl">{item.icon}</p>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link href={"https://taaghche.com/download"}>
        <p className="text-black p-2 bg-main-blue/70 text-center text-sm w-24 min-w-max rounded-full">
          نصب طاقچه
        </p>
      </Link>
    </div>
  );
};

export default HeaderBottom;
