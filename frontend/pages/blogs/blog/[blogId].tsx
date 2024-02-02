import { GetServerSideProps } from "next";
import React from "react";
import { RootState, wrapper } from "../../../Core/Redux/store";
import { apiConfig } from "../../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import BlogFlex from "../../../Core/Components/BlogFlex";
import ContactUsForm from "../../../Core/Components/ContactUsForm/index";
import BreadCrumb from "../../../Core/Components/BreadCrumb";

const BlogId = ({ blogInfo }: any) => {
  console.log(blogInfo);
  return (
    <div className="flex flex-col gap-6 mb-20">
      <BreadCrumb
        info={{
          name: blogInfo?.info?.title,
          link: `/blogs/blog/${blogInfo?.info?._id}`,
        }}
        categories={[blogInfo?.info?.relatedBlogCategory]}
      />
      <div className="flex lg:flex-col gap-10 p-8 bg-black">
        <div className="w-2/5 lg:w-full lg:h-[19rem] h-[16rem] rounded-xl">
          <img
            className=" object-cover rounded-xl !w-full !h-full"
            src={apiConfig.domain + blogInfo?.info?.image}
            alt=""
          />
        </div>
        <div className="flex flex-col lg:gap-6 justify-between text-white w-full">
          <h2 className="text-3xl font-bold">{blogInfo?.info?.title}</h2>
          <p className="text-justify">{blogInfo?.info?.description}</p>
          <div className="flex items-center gap-3 text-sm text-[#979797]">
            <p>
              {new Date(blogInfo?.info?.created_date).toLocaleDateString(
                "fa-ir",
                { year: "numeric", month: "numeric", day: "numeric" }
              )}
            </p>
            <p>{blogInfo?.info?.readingTime}</p>
            <p>
              {parseInt(blogInfo?.info?.seenCount).toLocaleString("fa-ir")}{" "}
              بازدید
            </p>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: blogInfo?.info?.content }}
        ></div>
      </div>
      <div className="bg-black pb-6 pt-2">
        <BlogFlex
          title={"آخرین مطالب این دسته بندی"}
          items={blogInfo?.relatedPosts}
          color="white"
        />
      </div>
      <div>
        <h1 className="my-4 mb-8 text-2xl font-bold">
          برای استعلام قیمت محصولات با ما در ارتباط باشید
        </h1>
        <ContactUsForm />
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

    const blogInfoRes = await axios.get(
      apiConfig.baseUrl + `blogPost/${query?.blogId}`
    );

    const categoryRes = await axios.get(apiConfig.baseUrl + "category");
    console.log(categoryRes.data);

    const contactUsCatData = await axios.get(
      apiConfig.baseUrl + "contactUsFormCategory"
    );

    // const blogHomeRes = await axios.get(apiConfig.baseUrl + "blog/home")

    store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 1 });

    store.dispatch({
      type: "contactUsCategories",
      payload: JSON.stringify(contactUsCatData.data.result),
    });
    // Dispatch Data To ServerSide Redux
    store.dispatch({
      type: "category",
      payload: JSON.stringify(categoryRes.data),
    });
    store.dispatch({
      type: "blogInfo",
      payload: JSON.stringify(blogInfoRes?.data),
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
  blogInfo: state.blogState.blogInfo,
});

export default connect(mapStatToProps)(BlogId);
