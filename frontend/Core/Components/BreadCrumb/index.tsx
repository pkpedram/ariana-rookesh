import React from "react";
import { Category } from "../../Redux/Reducers/reducerTypes";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

type bookInfo = {
  name: string;
  link: string;
};

type BreadCrumbProps = {
  categories?: Array<Object>;
  info: bookInfo;
};

const BreadCrumb = ({ categories, info }: BreadCrumbProps) => {
  return (
    <div className="w-full flex flex-wrap items-center text-sm text-[#0A1F44]">
      <Link href="/">آریانا روکش</Link>
      <p>
        <BsChevronLeft />
      </p>
      {categories?.map((item: any) => (
        <>
          <Link
            href={`/blogs/${item?._id}`}
            key={`BREADCRUMB_CATEGORY_${item?._id}`}
          >
            {item?.title}
          </Link>

          <p key={`BREADCRUMB_CHEVRON_${item?._id}`}>
            <BsChevronLeft />
          </p>
        </>
      ))}
      <Link className="underline underline-offset-8" href={info?.link}>
        {info?.name}
      </Link>
    </div>
  );
};

export default BreadCrumb;
