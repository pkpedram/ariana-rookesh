import { GetServerSideProps } from "next";
import React from "react";
import { RootState, wrapper } from "../../Core/Redux/store";
import BlogGrid from "../../Core/Components/BlogGrid";
import { apiConfig } from "../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import BlogFlex from "../../Core/Components/BlogFlex";
import { BsChevronLeft } from "react-icons/bs";
import Link from "next/link";

const BlogsPage = ({ blogHome }: any) => {
  // console.log(blogHome)
  return (
    <div className="flex flex-col gap-14 mb-24 !max-w-full !px-0">
      <div className="max-w-[90rem] mx-auto w-full px-4">
        <BlogGrid items={blogHome?.newest} title="جدیدترین‌ها" color="black" />
      </div>{" "}
      <div className="bg-black py-5">
        <BlogFlex
          items={blogHome?.mostSeen}
          title="محبوب ترین ها"
          color="white"
        />
      </div>
      {blogHome?.categories?.map((item: any) => (
        <>
          {item?.newest?.length > 0 && (
            <div className="max-w-[90rem] mx-auto w-full px-4">
              <BlogGrid
                items={item?.newest}
                color="black"
                title={`جدیدترین های ${item?.title}`}
                isMore
              />
            </div>
          )}
          {item?.mostSeen?.length > 0 && (
            <div className="bg-black py-5 !max-w-full !px-0 ">
              <BlogFlex
                items={item?.mostSeen}
                title={`محبوب ترین های ${item?.title}`}
                color="white"
                isMore
              />
            </div>
          )}
        </>
      ))}
      <div className="w-full flex md:flex-col max-w-[90rem] mx-auto gap-4 mt-20 lg:px-4">
        <div className="w-1/4 md:w-full h-full flex-col">
          <h1 className="text-xl font-bold mb-4">پیوند های مفید</h1>
          <div className="w-full border-2 border-black rounded-2xl p-4 h-full flex-1">
            {blogHome?.categories?.map((cat: any) => (
              <div className="flex gap-4 items-center">
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
          <h1 className="text-xl font-bold mb-4">شاید دوست داشته باشید</h1>
          <div className="w-full border-2 border-black rounded-2xl p-4">
            {blogHome?.maybeYouLike?.map((cat: any) => (
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
  );
};

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();

    const blogHomeRes = await axios.get(apiConfig.baseUrl + "blog/home");
    store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 1 });

    store.dispatch({
      type: "blogHome",
      payload: JSON.stringify(blogHomeRes.data),
    });

    store.dispatch({
      type: "generalSetting",
      payload: JSON.stringify(data.result[0]),
    });
    return {
      props: {},
    };
  });

const mapStatToProps = (state: RootState) => ({
  blogHome: state.blogState.blogHome,
});
export default connect(mapStatToProps)(BlogsPage);
