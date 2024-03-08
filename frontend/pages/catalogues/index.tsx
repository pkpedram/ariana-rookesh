import { GetServerSideProps } from "next";
import React, { Fragment } from "react";
import { RootState, wrapper } from "../../Core/Redux/store";
import { apiConfig } from "../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import { PublicState } from "../../Core/Redux/Reducers/reducerTypes";

import bg from "../../public/assets/image/homeBg.jpeg";
import { useRouter } from "next/router";

const Seller = ({
  catalogues,
  sellers,
  generalSetting,
  lan,
}: {
  catalogues: Array<Object>;
  sellers: Array<Object>;
  generalSetting: PublicState["generalSetting"];
  lan: boolean;
}) => {
  const router = useRouter();
  return (
    <Fragment>
      <div
        className="w-full h-screen  absolute top-0 right-0 !px-0 !max-w-full"
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
        <h1 className="mx-auto mb-8 text-2xl bg-white p-4 rounded-lg">
          {lan ? "Catalogues" : "کاتالوگ ها"}
        </h1>
        {catalogues?.map((seller: any) => (
          <div
            className={`w-full flex items-center justify-between p-6 border-2 border-white rounded-xl mt-6 ${
              lan ? "flex-row-reverse text-left" : ""
            }`}
          >
            <div
              className={`catalogues smmd:w-full sm:flex sm:flex-col sm:w-full sm:items-center`}
            >
              <p className="text-xl font-bold mb-4 text-white">
                {lan ? seller?.en_title : seller?.title}
              </p>
            </div>

            <div className="flex sm:col-span-full items-center justify-center order-3">
              <button
                onClick={() => window.open(apiConfig.domain + seller?.file)}
                className="p-2 text-white rounded w-32 text-center"
                style={{ background: generalSetting.secondaryColor }}
              >
                {lan ? "Download" : "دانلود"}
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

    const catalogues = await axios.get(apiConfig.baseUrl + "catalogue");

    // Dispatch Data To ServerSide Redux
    store.dispatch({
      type: "catalogues",
      payload: JSON.stringify(catalogues.data.result),
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
  catalogues: state.publicState.catalogues,
  sellers: state.publicState.sellers,
  generalSetting: state.publicState.generalSetting,
  lan: state.publicState.lan,
});

export default connect(mapStateToProps)(Seller);
