import type { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";
import { RootState, wrapper } from "../../Core/Redux/store";
import { apiConfig } from "../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import {
  ContactUsCategory,
  PublicState,
} from "../../Core/Redux/Reducers/reducerTypes";
import Link from "next/link";
import { PiPhone } from "react-icons/pi";
import { BsMailbox } from "react-icons/bs";
import ContactUsForm from "../../Core/Components/ContactUsForm";

const Home: any = ({
  categories,
  generalSetting,
  lan,
}: {
  categories: Array<ContactUsCategory>;
  generalSetting: PublicState["generalSetting"];
  lan: boolean;
}) => {
  return (
    <Fragment>
      <div
        className={` w-full flex justify-between items-center mb-16 flex-wrap gap-6 ${
          lan ? "ltr" : ""
        } `}
      >
        <div className={lan ? "ltr text-left" : ""}>
          <p className="font-semibold">
            {lan ? generalSetting.en_contactUs : generalSetting.contactUs}
          </p>
          <h3 className="text-2xl mt-8 font-bold">
            {lan ? (
              <>Address: {generalSetting.en_address}</>
            ) : (
              <> آدرس: {generalSetting.address}</>
            )}
          </h3>
        </div>

        <div
          className={`flex flex-col gap-4 ${
            lan ? "items-start" : "items-end"
          } md:justify-end md:w-full`}
        >
          <h4 className="text-xl font-bold">
            {lan ? "Ways to Contact us" : "راه های تماس با ما"}
          </h4>
          <div
            className={`flex items-center gap-2 [&>p]:font-bold ${
              lan ? "ltr" : ""
            }`}
          >
            <p>{generalSetting.phoneNumber}</p>
            <PiPhone />
          </div>
          <div
            className={`flex items-center gap-2 [&>p]:font-bold ${
              lan ? "ltr" : ""
            }`}
          >
            <p>{generalSetting.email}</p>
            <BsMailbox />
          </div>
        </div>
      </div>
      <ContactUsForm />
      <div className="mb-24 mt-10 h-[38rem] ">
        <iframe
          className="w-full  absolute  right-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.447900415886!2d51.599553676573585!3d35.54263887263238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f91e92baf356e8d%3A0xcec842fda50bb55c!2z2KLYsduM2KfZhtinINix2Yjaqdi0!5e0!3m2!1sen!2s!4v1705701393480!5m2!1sen!2s"
          //   width="600"
          height="650"
          //   style="border:0;"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Fragment>
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
  categories: state.publicState.contactUsCategories,
  generalSetting: state.publicState.generalSetting,
  lan: state.publicState.lan,
});

export default connect(mapStateToProps)(Home);
