import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { RootState, wrapper } from "../../../Core/Redux/store";
import { apiConfig } from "../../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import BlogFlex from "../../../Core/Components/BlogFlex";
import ContactUsForm from "../../../Core/Components/ContactUsForm/index";
import BreadCrumb from "../../../Core/Components/BreadCrumb";
import Link from "next/link";
import { PiPlusLight } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import imagePlaceholder from "../../../public/assets/image/jk-placeholder-image.jpg";
import sadSvg from "../../../public/assets/image/sad.svg";
import notBadSvg from "../../../public/assets/image/notbad.svg";
import happySvg from "../../../public/assets/image/happy.svg";
import veryHappySvg from "../../../public/assets/image/veryhappy.svg";
import { toast } from "react-toastify";

const BlogId = ({ blogInfo }: any) => {
  console.log(blogInfo);
  const [openedFaq, setOpenedFaq] = useState(null);
  return (
    <div className="flex flex-col gap-6 mb-20 !max-w-full !px-0">
      <div className="w-full max-w-[90rem] mx-auto">
        <BreadCrumb
          info={{
            name: blogInfo?.info?.title,
            link: `/blogs/blog/${blogInfo?.info?._id}`,
          }}
          categories={[blogInfo?.info?.relatedBlogCategory]}
        />
      </div>
      <div className=" w-full bg-black p-8">
        <div className="flex lg:flex-col gap-10 max-w-[90rem] mx-auto">
          <div className="w-2/5 lg:w-full lg:h-[19rem] min-h-[16rem] rounded-xl">
            <img
              className=" object-cover rounded-xl !w-full !h-full"
              src={apiConfig.domain + blogInfo?.info?.image}
              alt=""
            />
          </div>
          <div className="flex flex-col lg:gap-6 justify-between text-white w-full">
            <h2 className="text-3xl font-bold mb-4">{blogInfo?.info?.title}</h2>
            <p className="text-justify">{blogInfo?.info?.description}</p>
            <div className="flex items-center gap-3 text-sm mt-2 text-[#979797]">
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
      </div>
      <div className="max-w-[90rem] !px-4 mx-auto w-full mb-20 gap-40 lg:flex-col-reverse flex items-start mt-10">
        <div className="flex-1 flex flex-col gap-8">
          <div
            className="text-justify mb-8"
            dangerouslySetInnerHTML={{ __html: blogInfo?.info?.content }}
          ></div>
          {blogInfo?.sections?.map((section: any) => (
            <div className="w-full mt-8" id={section?._id} key={section?._id}>
              <h2 className="text-2xl font-bold py-3 border-b-2 border-black mb-4">
                {section.title}
              </h2>
              {section?.image && (
                <img
                  src={apiConfig.domain + section?.image}
                  className="w-full"
                />
              )}
              <div
                className="text-justify mt-8"
                dangerouslySetInnerHTML={{ __html: section?.content }}
              ></div>
            </div>
          ))}

          <div className="mt-20 w-full">
            {blogInfo?.faq?.map((faq: any) => (
              <div className="w-full p-4 rounded-2xl border border-black my-2">
                <div className="w-full flex items-center justify-between">
                  <p className="text-lg font-bold">{faq.title}</p>
                  <p
                    className="text-black text-2xl"
                    onClick={() =>
                      openedFaq === faq?._id
                        ? setOpenedFaq(null)
                        : setOpenedFaq(faq?._id)
                    }
                  >
                    {openedFaq === faq?._id ? <FaTimes /> : <PiPlusLight />}
                  </p>
                </div>
                <p className={`mt-4 ${openedFaq === faq?._id ? "" : "hidden"}`}>
                  {faq.content}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full p-4 rounded-2xl border border-black">
            <div className="flex items-center gap-4">
              <img
                src={
                  blogInfo?.info?.authorPic
                    ? apiConfig.domain + blogInfo?.info?.authorPic
                    : imagePlaceholder.src
                }
                className="w-20 aspect-square object-contain rounded-full"
              />
              <p className="text-lg font-bold">
                {blogInfo?.info?.authorName?.length !== 0
                  ? blogInfo?.info?.authorName
                  : "آریاناروکش"}
              </p>
            </div>
            <p className="mt-4 text-justify text-gray-500">
              {blogInfo?.info?.authorDescription}
            </p>
          </div>
          <div className="p-4 pt-8 rounded-2xl relative border-2 border-black mx-auto md:w-full">
            <p className="text-sm absolute p-2 rounded-lg border-2 border-black bg-white -top-5 right-2">
              نظر شما راجع به این محتوا چیست؟
            </p>
            <div className="w-full grid grid-cols-4 gap-6">
              <div
                onClick={() => toast.success("نظر شما با موفقیت ثبت شد!")}
                className="p-2 aspect-square flex items-center cursor-pointer justify-center rounded-full bg-black"
              >
                <img src={sadSvg.src} />
              </div>
              <div
                onClick={() => toast.success("نظر شما با موفقیت ثبت شد!")}
                className="p-2 aspect-square flex items-center cursor-pointer justify-center rounded-full bg-black"
              >
                <img src={notBadSvg.src} />
              </div>
              <div
                onClick={() => toast.success("نظر شما با موفقیت ثبت شد!")}
                className="p-2 aspect-square flex items-center cursor-pointer justify-center rounded-full bg-black"
              >
                <img src={happySvg.src} />
              </div>
              <div
                onClick={() => toast.success("نظر شما با موفقیت ثبت شد!")}
                className="p-2 aspect-square flex items-center cursor-pointer justify-center rounded-full bg-black"
              >
                <img src={veryHappySvg.src} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 rounded-xl relative border-2 border-black min-w-[17.5rem] lg:w-full">
          <p className="text-sm absolute p-2 rounded-lg border-2 border-black bg-white -top-5 right-2">
            آنچه در این مطالب خواهید خواند
          </p>
          <p
            className="hover:underline cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {blogInfo?.info?.title}
          </p>
          {blogInfo?.sections?.map((section: any) => (
            <div>
              <Link
                href={"#" + section?._id}
                className="hover:underline cursor-pointer"
              >
                {section?.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black py-12">
        <BlogFlex
          title={"آخرین مطالب این دسته بندی"}
          items={blogInfo?.relatedPosts}
          color="white"
        />
      </div>
      <div className="w-full mx-auto max-w-[90rem]">
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
