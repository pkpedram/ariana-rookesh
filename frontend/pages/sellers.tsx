import { GetServerSideProps } from "next";
import React, { Fragment } from "react";
import { RootState, wrapper } from "../Core/Redux/store";
import { apiConfig } from "../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import { PublicState } from "../Core/Redux/Reducers/reducerTypes";

import bg from "../public/assets/image/homeBg.jpeg";
import { useRouter } from "next/router";

const Seller = ({
  cityList,
  sellers,
  generalSetting,
  lan,
}: {
  cityList: any;
  sellers: Array<Object>;
  generalSetting: PublicState["generalSetting"];
  lan: boolean;
}) => {
  const router = useRouter();
  return (
    <Fragment>
      <div
        className="w-full h-screen  absolute top-0 right-0"
        style={{
          backgroundImage: `url('${bg.src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",

          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute z-10 bg-gradient-to-t from-black to-transparent w-full h-full"></div>
      </div>

      <div className="w-full  z-20 relative  mt-72 mb-32 grid grid-cols-1     gap-4">
        <div className="w-full flex items-center justify-center">
          <select
            className="min-w-[15rem] p-2 rounded-xl outline-none"
            onChange={(e) =>
              e.target.value?.length !== 0 &&
              router.push({
                pathname: "/sellers",
                query: { city: e.target.value },
              })
            }
          >
            <option value={""}>انتخاب شهر</option>
            {cityList?.map((city: any) => (
              <option value={city?._id}>{city?.name}</option>
            ))}
          </select>
        </div>
        {sellers?.map((seller: any) => (
          <div
            className={`w-full flex sm:!grid sm:!grid-cols-2 gap-4 sm:gap-y-6 smmd:!grid-cols-1 p-6 border-2 border-white rounded-xl mt-6 ${
              lan ? "flex-row-reverse text-left" : ""
            }`}
          >
            <div
              className={`w-40 smmd:w-full sm:flex sm:flex-col sm:w-full sm:items-center`}
            >
              <p className="text-xl font-bold mb-4 text-white">
                {lan ? seller?.en_name : seller?.name}
              </p>
              <p className="text-gray-300">
                {lan ? seller?.relatedCity?.en_name : seller?.relatedCity?.name}
              </p>
            </div>
            <div className="flex-1 sm:flex sm:flex-col sm:items-center">
              <p className="text-lg font-bold text-white mb-4">
                {seller?.agentName}
              </p>
              <p className="text-gray-300">
                {lan ? seller?.en_description : seller?.description}
              </p>
            </div>
            <div className="flex sm:col-span-full items-center justify-center order-3">
              <button
                onClick={() => window.open("tel:" + seller?.phoneNumber)}
                className="p-2 text-white rounded w-32 text-center"
                style={{ background: generalSetting.secondaryColor }}
              >
                {lan ? "Order" : "سفارش"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    // Fetching BookList for the first Time
    console.log(query);
    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();

    const cityRes = await axios.get(apiConfig.baseUrl + "city");

    const sellerRes = await axios.get(
      apiConfig.baseUrl +
        "seller" +
        (query?.city ? "?relatedCity=" + query?.city : "")
    );

    store.dispatch({
      type: "city",
      payload: JSON.stringify(cityRes.data),
    });

    // Dispatch Data To ServerSide Redux
    store.dispatch({
      type: "sellers",
      payload: JSON.stringify(sellerRes.data.result),
    });
    store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 2 });
    store.dispatch({
      type: "generalSetting",
      payload: JSON.stringify(data.result[0]),
    });

    return {
      props: {},
    };
  });

const mapStateToProps = (state: RootState) => ({
  cityList: state.publicState.cityList,
  sellers: state.publicState.sellers,
  generalSetting: state.publicState.generalSetting,
  lan: state.publicState.lan,
});

export default connect(mapStateToProps)(Seller);
