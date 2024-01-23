import React from "react";
import logo from "../public/assets/image/logo.svg";
import Image from "next/image";
import { GetServerSideProps, GetStaticProps } from "next";
import { wrapper } from "../Core/Redux/store";
import { apiConfig } from "../Core/Redux/constants";

const Error500Page = () => {
  return (
    <div className="w-full flex flex-col items-center py-32">
      <Image src={logo} alt="لوگو" />
      <h2 className="text-2xl text-black font-bold mb-3">
        مشکلی پیش آمده است!
      </h2>
      <button
        className="w-40 h-10 rounded-md bg-black text-white"
        type="button"
        onClick={() => location.reload()}
      >
        امتحان دوباره؟
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{}> = wrapper.getStaticProps(
  (store) =>
    async ({}) => {
      // Fetching BookList for the first Time

      const res = await fetch(apiConfig.baseUrl + "generalSetting", {
        cache: "force-cache",
      });
      const data = await res.json();

      store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 1 });
      store.dispatch({
        type: "generalSetting",
        payload: JSON.stringify(data.result[0]),
      });

      return {
        props: {},
      };
    }
);

export default Error500Page;
