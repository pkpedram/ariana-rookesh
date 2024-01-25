import Link from "next/link";
import React from "react";
import { apiConfig } from "../../Redux/constants";
import BlogItem from "../BlogItem";

const BlogFlex = ({ items, title, isMore, color }: any) => {
  return (
    <div className="flex flex-col items-center gap-4 w-4/5 mx-auto lg:w-full 2md:!w-4/5">
      <div className="flex items-center justify-between w-full">
        <p
          className={`font-bold text-2xl ${
            color == "white" ? "text-white" : ""
          }`}
        >
          {title}
        </p>
        {isMore && (
          <Link href={`/blogs/${items[0].relatedBlogCategory}`}>
            <div
              className={`flex items-center gap-1 ${
                color == "white" ? "text-white" : ""
              }`}
            >
              <p>مشاهده همه</p>
              <svg
                width="5"
                height="15"
                viewBox="0 0 10 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.09716 19.7948L10 17.4689L3.81916 9.8974L10 2.32588L8.09717 -5.92785e-06L-2.54292e-07 9.8974L8.09716 19.7948Z"
                  fill={color}
                />
              </svg>
            </div>
          </Link>
        )}
      </div>
      <div className="flex gap-6 justify-between w-full  2lg:flex-wrap 2lg:justify-center 2lg:items-center ">
        {items?.map((item: any) => (
          <BlogItem item={item} color="white" />
        ))}
      </div>
    </div>
  );
};

export default BlogFlex;
