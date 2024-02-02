import { GetServerSideProps } from "next";
import React from "react";
import { RootState, wrapper } from "../../Core/Redux/store";
import { apiConfig } from "../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import BlogItem from "../../Core/Components/BlogItem";
import BreadCrumb from "../../Core/Components/BreadCrumb";
import { BsChevronLeft } from "react-icons/bs";
import Link from "next/link";

const BlogCategoryId = ({ blogList, blogCategoryInfo }: any) => {
  // console.log(blogCategoryInfo)
  return (
    <div className="flex flex-col gap-8 w-full !max-w-full [&>*]:max-w-[90rem] !px-0 [&>*]:mx-auto [&>*]:w-full [&>*]:px-4">
      <BreadCrumb
        categories={[]}
        info={{
          name: blogCategoryInfo?.title,
          link: `/blogs/${blogCategoryInfo?._id}`,
        }}
      />
      <div className="bg-black p-4 text-white flex flex-col gap-4 smmd:!p-0 !max-w-full [&>*]:max-w-[90rem] [&>*]:mx-auto [&>*]:w-full">
        <h3 className="text-2xl font-bold">{blogCategoryInfo?.title}</h3>
        <p className="text-justify">{blogCategoryInfo?.description}</p>
      </div>
      <div className="p-4 flex flex-col gap-4 smmd:!p-0">
        <h3 className="text-2xl font-bold">
          دسته بندی موضوعی {blogCategoryInfo?.title}:
        </h3>
        <div className="grid grid-cols-3 gap-10 lg:grid-cols-2 sm:grid-cols-1">
          {blogList?.map((item: any) => (
            <BlogItem item={item} isMain color="black" />
          ))}
        </div>
      </div>
      <div className="bg-black p-4 mt-20 py-16 mb-20 text-white flex flex-col gap-4 smmd:!p-0 !max-w-full [&>*]:max-w-[90rem] [&>*]:mx-auto [&>*]:w-full">
        <div className="w-full flex md:flex-col max-w-[90rem] mx-auto gap-4  lg:px-4">
          <div className="w-1/4 md:w-full h-full flex-col">
            <h1 className="text-2xl font-bold mb-6">مهم ترین مقالات</h1>
            <div className="w-full border-2 bg-white text-black border-black rounded-2xl p-4 h-full flex-1">
              {blogList
                ?.filter((itm: any) => itm?.isImportant)
                ?.map((cat: any) => (
                  <div className="flex gap-4 items-center ">
                    <p>
                      <BsChevronLeft />
                    </p>
                    <Link href={`/blogs/${cat._id}`} className="font-bold">
                      {cat.title}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-6">شاید دوست داشته باشید</h1>
            <div className="w-full border-2 bg-white text-black border-black rounded-2xl p-4">
              {blogList?.slice(0, 5)?.map((cat: any) => (
                <div className="flex gap-4 items-center">
                  <p>
                    <BsChevronLeft />
                  </p>
                  <Link href={`/blog/${cat._id}`} className="font-bold">
                    {cat.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();

    // const blogInfoRes = await axios.get(apiConfig.baseUrl + `blogPost/${query?.blogId}`)

    // const blogHomeRes = await axios.get(apiConfig.baseUrl + "blog/home")

    const blogByCategoryRes = await axios.get(
      apiConfig.baseUrl + `blogPost?relatedBlogCategory=${query?.categoryId}`
    );
    const blogCategoryRes = await axios.get(
      apiConfig.baseUrl + `blogCategory/${query?.categoryId}`
    );

    store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 1 });

    store.dispatch({
      type: "blogCategoryInfo",
      payload: JSON.stringify(blogCategoryRes.data),
    });
    store.dispatch({
      type: "blogCategory",
      payload: JSON.stringify(blogByCategoryRes?.data),
    });

    store.dispatch({
      type: "generalSetting",
      payload: JSON.stringify(data.result[0]),
    });
    return {
      props: {},
    };
  });

const mapStateToProps = (state: RootState) => ({
  blogList: state.blogState.blogList,
  blogCategoryInfo: state.blogState.blogCategoryInfo,
});

export default connect(mapStateToProps)(BlogCategoryId);
