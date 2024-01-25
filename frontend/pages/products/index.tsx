import { GetServerSideProps } from "next";
import React from "react";
import { RootState, wrapper } from "../../Core/Redux/store";
import { apiConfig } from "../../Core/Redux/constants";
import axios from "axios";
import { Category } from "../../Core/Redux/Reducers/reducerTypes";
import { connect } from "react-redux";
import Link from "next/link";

const Products = ({
  categories,
  lan,
}: {
  categories: Array<Category>;
  lan: boolean;
}) => {
  return (
    // <div className="w-full z-[1] top-0 right-0 absolute h-full bg-black">
    <div className="w-full h-full max-w-[95rem] grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 relative  place-content-end pb-10 gap-4">
      {categories.map((category) => (
        <Link
          href={"/products/" + category.slug}
          key={category._id}
          className="w-full aspect-square border-2 text-white bg-black/50 hover:bg-black hover:scale-100 scale-90 border-white rounded-xl flex flex-col gap-4 items-center justify-center"
        >
          <p className="text-2xl font-bold">
            {lan ? category.en_name : category.name}
          </p>
          <p className="text-lg text-gray-400">
            {lan ? category.name : category.en_name}
          </p>
          <div className="h-1/2 p-4">
            <img
              src={apiConfig.domain + category.icon}
              className=" h-full object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
    // </div>
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

    // Dispatch Data To ServerSide Redux
    store.dispatch({
      type: "category",
      payload: JSON.stringify(categoryRes.data),
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
  categories: state.productState.categories,
  lan: state.publicState.lan,
});
export default connect(mapStateToProps)(Products);
