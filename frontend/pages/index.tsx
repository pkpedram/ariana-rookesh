import type { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";
import { RootState, wrapper } from "../Core/Redux/store";
import { apiConfig } from "../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import { Category } from "../Core/Redux/Reducers/reducerTypes";
import Link from "next/link";

const Home: any = ({ categories }: { categories: Array<Category> }) => {
  return (
    <Fragment>
      <div className="w-full  bg-gradient-to-b from-transparent via-black/90 to-black p-4 absolute h-[80vh] flex items-center justify-center right-0 bottom-0">
        <div className="w-full h-full max-w-[95rem] grid grid-cols-4  place-content-end pb-10 gap-4">
          {categories.map((category) => (
            <Link
              href={"/products/" + category.slug}
              key={category._id}
              className="w-full aspect-square border-2 text-white bg-black/50 hover:bg-black hover:scale-100 scale-90 border-white rounded-xl flex flex-col gap-4 items-center justify-center"
            >
              <p className="text-2xl font-bold">{category.name}</p>
              <p className="text-lg text-gray-400">{category.en_name}</p>
              <img src={apiConfig.domain + category.icon} className="h-1/2" />
            </Link>
          ))}
        </div>
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

    const categoryRes = await axios.get(
      apiConfig.baseUrl + "category?showOnHomePage=true"
    );
    console.log(categoryRes.data);

    // Dispatch Data To ServerSide Redux
    store.dispatch({
      type: "category",
      payload: JSON.stringify(categoryRes.data),
    });
    store.dispatch({ type: "SET_LAYOUT_TYPE", payload: 3 });
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
});

export default connect(mapStateToProps)(Home);
