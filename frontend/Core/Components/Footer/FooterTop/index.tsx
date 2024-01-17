import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { RootState } from "../../../Redux/store";
import { connect } from "react-redux";

export interface FooterTopProps {
  isMobile: boolean;
}

const FooterTop = ({ isMobile }: FooterTopProps) => {
  const downloadItems = [
    {
      link: "https://play.google.com/store/apps/details?id=com.taghche.books&hl=fa&gl=US&pli=1",
      image: "https://taaghche.com/images/footer/googlePlay.webp",
      alt: "دانلود از گوگل پلی",
    },
    {
      link: "https://taaghche.com/download#pc",
      image: "https://taaghche.com/images/footer/windows.webp",
      alt: "دانلود ورژن ویندوز",
    },
  ];

  return (
    <div
      className={`${
        isMobile ? "flex-col items-center" : ""
      } w-full max-w-[65rem] flex gap-8 justify-between`}
    >
      <div className="w-52">
        <Image
          src={"https://taaghche.com/images/footer/Android.webp"}
          alt="android"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-start flex-1 gap-4 justify-between">
        <h1 className="text-2xl text-main-blue">نزدیک ترین کتابفروشی شهر</h1>
        <div className="w-full flex gap-3">
          {downloadItems.map((item, idx) => (
            <Link href={item.link} key={`DOWNLOAD_ITEMS__${idx}`}>
              <div className="w-36">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={300}
                  height={100}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className={`flex items-end ${isMobile ? "w-full" : "w-36"}`}>
        <Link href={"https://taaghche.com/downloads"} className="w-full">
          <div
            className={`h-10 bg-main-blue/30 w-full rounded-md text-main-blue flex items-center justify-center text-3xl`}
          >
            <HiDotsHorizontal />
          </div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isMobile: state.publicState.isMobile,
});

export default connect(mapStateToProps)(FooterTop);
