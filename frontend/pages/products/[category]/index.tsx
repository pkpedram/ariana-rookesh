import { GetServerSideProps } from "next";
import React, { Fragment } from "react";
import { RootState, wrapper } from "../../../Core/Redux/store";
import { apiConfig } from "../../../Core/Redux/constants";
import axios from "axios";
import { connect } from "react-redux";
import {
  Category,
  ProductListItem,
  PublicState,
} from "../../../Core/Redux/Reducers/reducerTypes";
import Link from "next/link";
import imagePlaceHolder from "../../../public/assets/image/jk-placeholder-image.jpg";

const ProductsCategory = ({
  categoryInfo,
  productList,
  generalSetting,
}: {
  categoryInfo: Category;
  productList: Array<ProductListItem>;
  generalSetting: PublicState["generalSetting"];
}) => {
  return (
    <Fragment>
      <div
        className="w-full h-screen  absolute top-0 right-0"
        style={{
          backgroundImage: `url('${apiConfig?.domain + categoryInfo.banner}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",

          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute bg-gradient-to-t from-black to-transparent w-full h-full"></div>
      </div>
      {productList?.length !== 0 ? (
        <div className="w-full  relative  mt-40 mb-32 grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4">
          {productList.map((item) => (
            <Link
              href={`/product/${item._id}/${item.name.split(" ").join("-")}`}
              className="w-full p-3 border-2 text-white bg-black/50 hover:bg-black hover:scale-100 scale-90 border-white rounded-xl flex flex-col gap-4 items-center justify-center"
            >
              <img
                src={
                  item.image
                    ? apiConfig.domain + item.image
                    : imagePlaceHolder.src
                }
                className="w-full rounded-lg bg-gray-500 object-cover aspect-square"
              />
              <h4 className="font-bold mb-2 text-right w-full">{item.name}</h4>
              <p className="w-full text-right color-[#F2F4F8] flex-1">
                {item.description?.slice(0, 200)}...
              </p>

              <p className="text-left w-full">
                {categoryInfo?.showProductPrices && item.showPrice
                  ? `${Number(item.price).toLocaleString("fa-ir")} تومان`
                  : "تماس بگیرید"}
              </p>
              <button
                className="w-full p-5 rounded-lg"
                style={{ background: generalSetting.secondaryColor }}
              >
                مشاهده محصول
              </button>
            </Link>
          ))}
        </div>
      ) : (
        <div className="justify-center bg-black p-4 w-max mx-auto gap-4 text-white flex items-center flex-col rounded-lg  relative  mt-40 mb-32">
          <h1 className="text-xl">محصولی در این دسته بندی موجود نیست</h1>
          <Link
            href={"/"}
            className="w p-3 px-6 rounded-lg"
            style={{ background: generalSetting.secondaryColor }}
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      )}
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

    const categoryRes = await axios.get(
      apiConfig.baseUrl + "category?slug=" + query.category
    );

    const productRes = await axios.get(
      apiConfig.baseUrl +
        "product?relatedCategory=" +
        categoryRes.data.result[0]?._id
    );
    console.log(productRes.data);

    store.dispatch({
      type: "productList",
      payload: JSON.stringify(productRes.data),
    });

    // Dispatch Data To ServerSide Redux
    store.dispatch({
      type: "categoryInfo",
      payload: JSON.stringify(categoryRes.data.result[0]),
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
  categoryInfo: state.productState.categoryInfo,
  productList: state.productState.productList,
  generalSetting: state.publicState.generalSetting,
});

export default connect(mapStateToProps)(ProductsCategory);
