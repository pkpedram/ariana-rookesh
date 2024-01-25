import React from "react";
import errorGif from "../public/assets/image/error.gif";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSideProps, GetStaticProps } from "next";
import { RootState, wrapper } from "../Core/Redux/store";
import { apiConfig } from "../Core/Redux/constants";
import { connect } from "react-redux";

const Error404Page = ({ lan }: { lan: boolean }) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center py-40">
      <Image src={errorGif} width={700} height={400} alt="404 Gif" />
      <h2
        className={`text-2xl ${
          lan ? "ltr" : ""
        } text-black font-bold mb-3 mt-10`}
      >
        {lan ? "Page not found..." : "صفحه مورد نظر پیدا نشد"}
      </h2>
      <button
        className="w-56 h-10  rounded-md bg-black text-white"
        type="button"
        onClick={() => router.replace("/")}
      >
        {lan ? "Return To Home Page" : " بازگشت به صفحه اصلی"}
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

const mapStateToProps = (state: RootState) => ({
  lan: state.publicState.lan,
});

export default connect(mapStateToProps)(Error404Page);
