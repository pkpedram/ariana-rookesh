import { GetServerSideProps } from "next";
import React from "react";
import { RootState, wrapper } from "../../Core/Redux/store";
import { apiConfig } from "../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import aboutImage from "../../public/assets/image/about.png";
import Image from "next/image";
import { Category, PublicState } from "../../Core/Redux/Reducers/reducerTypes";
import ContactUsForm from "../../Core/Components/ContactUsForm";

const AboutUs = ({
  categories,
  lan,
  generalSetting,
}: {
  categories: Array<Category>;
  lan: boolean;
  generalSetting: PublicState["generalSetting"];
}) => {
  return (
    <div className="w-full mb-20 !px-0 !max-w-full [&>*]:max-w-[90rem] [&>*]:mx-auto">
      <div className="w-full px-8">
        <h1 className={`${lan ? "ltr" : ""} text-xl font-bold `}>
          {lan ? "About Ariana Holding" : "درباره هلدینگ آریانا"}
        </h1>
        <Image
          src={aboutImage}
          alt="عکس چوب"
          className="w-full my-6 rounded-2xl"
        />
        <div
          className={`${lan ? "ltr" : ""} mb-8`}
          dangerouslySetInnerHTML={{
            __html: lan
              ? generalSetting.en_aboutUs_full
              : generalSetting.aboutUs_full,
          }}
        ></div>
      </div>

      {categories.map((item, idx) =>
        idx % 2 === 0 ? (
          <div className="w-full bg-black !max-w-full px-32 lg:px-16 md:px-4">
            <div
              className={` max-w-[90rem] mx-auto p-8 flex lg:flex-col-reverse w-full items-center gap-16 justify-between  relative mt-40 mb-16 ${
                lan ? "ltr" : ""
              }`}
            >
              <div className="w-1/2 lg:w-full min-h-[10rem] ">
                <h1
                  className={`${
                    lan ? "text-left" : ""
                  } text-white mb-4 text-xl font-bold`}
                >
                  {lan
                    ? `${item.en_name}s of Ariana holding`
                    : `${item.name} های هلدینگ آریانا`}
                </h1>
                <p
                  className={`text-white ${
                    lan ? "text-left ltr" : ""
                  } text-justify `}
                >
                  {lan ? item.en_description : item.description}
                </p>
              </div>
              <div
                className={`w-1/3 lg:w-full h-full lg:relative flex items-center justify-center absolute ${
                  lan ? "right-32 lg:right-0" : "left-32 lg:left-0"
                } overflow-hidden rounded-2xl -top-[25%] lg:bottom-[10rem] md:bottom-0`}
              >
                <img
                  alt={item.name}
                  src={apiConfig.domain + item.aboutUsImage}
                  className=" w-full aspect-square object-cover rounded-2xl "
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[90rem] mx-auto px-8">
            <h1 className={`${lan ? "text-left" : ""} mb-4 text-xl font-bold`}>
              {" "}
              {lan
                ? `${item.en_name}s of Ariana holding`
                : `${item.name} های هلدینگ آریانا`}
            </h1>
            <img
              src={apiConfig.domain + item.aboutUsImage}
              className="w-full h-60 object-cover object-center my-8 "
            />
            <p className={` ${lan ? "text-left ltr" : ""} text-justify `}>
              {lan ? item.en_description : item.description}
            </p>
          </div>
        )
      )}
      <div className="w-full mt-8 px-8">
        <ContactUsForm />
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    // Fetching BookList for the first Time

    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();

    const categoryRes = await axios.get(apiConfig.baseUrl + "category");
    console.log(categoryRes.data);

    const contactUsCatData = await axios.get(
      apiConfig.baseUrl + "contactUsFormCategory"
    );

    store.dispatch({
      type: "contactUsCategories",
      payload: JSON.stringify(contactUsCatData.data.result),
    });
    // Dispatch Data To ServerSide Redux
    store.dispatch({
      type: "category",
      payload: JSON.stringify(categoryRes.data),
    });
    store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 1 });
    store.dispatch({
      type: "generalSetting",
      payload: JSON.stringify(data.result[0]),
    });

    return {
      props: {},
    };
  });

const mapStateToProps = (state: RootState) => ({
  categories: state.productState.categories,
  generalSetting: state.publicState.generalSetting,
  lan: state.publicState.lan,
});

export default connect(mapStateToProps)(AboutUs);
