import Link from "next/link";
import React from "react";
import { apiConfig } from "../../Redux/constants";

const BlogItem = ({ item, color, isMain }: any) => {
  return isMain ? (
    <div
      className={`p-4 border border-[#000] rounded-xl flex flex-col gap-2 justify-between w-full  ${
        color == "white" ? "text-white border-[#FFF]" : ""
      }`}
      key={item?.id}
    >
      <div className="rounded-xl h-[15rem]">
        <img
          className="object-cover !h-full !w-full rounded-xl"
          src={apiConfig.domain + item.image}
          alt=""
        />
      </div>
      <h3 className="font-bold text-xl ">{item?.title}</h3>
      <p className="text-justify text-md overflow-hidden">
        {item?.description?.length > 200
          ? item.description.substring(0, 200) + "..."
          : item?.description}
      </p>
      <div className="flex items-center gap-1 text-sm text-[#979797]">
        <p>
          {new Date(item?.created_date).toLocaleDateString("fa-ir", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </p>
        <p>{item?.readingTime}</p>
        <p>{parseInt(item?.seenCount).toLocaleString("fa-ir")} بازدید</p>
      </div>
      <div className="w-full flex justify-start">
        <Link href={`/blogs/blog/${item?._id}`}>
          <button
            className={`text-white bg-black rounded-xl px-4 py-2  ${
              color == "white" ? "!text-black bg-white" : ""
            }`}
          >
            ادامه مطلب
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div
      className={`p-4 border border-[#000] rounded-xl flex flex-col gap-2 justify-between w-1/3 2lg:w-2/5 2md:w-full  ${
        color == "white" ? "text-white border-[#FFF]" : ""
      }`}
      key={item?.id}
    >
      <div className="rounded-xl h-[15rem]">
        <img
          className="object-cover !h-full !w-full rounded-xl"
          src={apiConfig.domain + item.image}
          alt=""
        />
      </div>
      <h3 className="font-bold text-xl ">{item?.title}</h3>
      <p className="text-justify text-md overflow-hidden">
        {item?.description?.length > 200
          ? item.description.substring(0, 200) + "..."
          : item?.description}
      </p>
      <div className="flex items-center gap-1 text-sm text-[#979797]">
        <p>
          {new Date(item?.created_date).toLocaleDateString("fa-ir", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        |<p>{item?.authorName}</p>
      </div>
      <div className="w-full flex justify-end">
        <Link href={`/blogs/blog/${item?._id}`}>
          <button
            className={`text-white bg-black rounded-xl px-4 py-2  ${
              color == "white" ? "!text-black bg-white" : ""
            }`}
          >
            ادامه مطلب
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
