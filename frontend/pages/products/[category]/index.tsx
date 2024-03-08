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
import discountImage from "../../../public/assets/image/discount_726476-01 1.svg";

const ProductsCategory = ({
  categoryInfo,
  productList,
  generalSetting,
  lan,
  hotOffers,
}: {
  categoryInfo: Category;
  productList: Array<ProductListItem>;
  generalSetting: PublicState["generalSetting"];
  lan: boolean;
  hotOffers: Array<ProductListItem>;
}) => {
  return (
    <div>
      <div
        className="w-full h-screen  absolute top-0 right-0 px-0 !mx-0 !max-w-full"
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
        <>
          {hotOffers?.length !== 0 && (
            <div className="w-full p-8 border-[2px] border-white mt-20 xl:flex-col relative rounded-xl px-4 gap-16 flex">
              <div className="flex flex-col items-center justify-center pr-8">
                <h1 className="text-white text-4xl font-black leading-normal text-center mb-8">
                  پیشنهاد
                  <br /> شگفت انگیز
                </h1>
                <img src={discountImage.src} />
              </div>
              <div className="flex-1 grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1 lg:px-4 lg:pr-4 gap-8 px-16 pr-8">
                {hotOffers?.map((item) => (
                  <Link
                    href={`/product/${item._id}/${item.name
                      .split(" ")
                      .join("-")}`}
                    className="w-full p-3 border-2 text-white bg-black/50 hover:bg-black  border-white rounded-xl flex flex-col gap-4 items-center justify-center"
                  >
                    <img
                      src={
                        item.image
                          ? apiConfig.domain + item.image
                          : imagePlaceHolder.src
                      }
                      className="w-full rounded-lg bg-gray-500 object-cover aspect-square"
                    />
                    <h4
                      className={`font-bold mb-2 ${
                        lan ? "text-left" : "text-right"
                      } w-full`}
                    >
                      {lan ? item.en_name : item.name}
                    </h4>
                    {/* <p
                        className={`${
                          lan ? "ltr text-left" : "text-right"
                        } w-full  color-[#F2F4F8] flex-1`}
                      >
                        {lan ? (
                          <> {item.en_description?.slice(0, 200)}...</>
                        ) : (
                          <> {item.description?.slice(0, 200)}...</>
                        )}
                      </p> */}
                    <div className="w-full flex items-center justify-between">
                      <p className="py-1 px-3 rounded bg-red-600 text-sm">
                        {Math.ceil(
                          100 -
                            (Number(item.offerPrice) * 100) / Number(item.price)
                        )}
                        %
                      </p>
                      <div className="text-left ">
                        {" "}
                        <p
                          className={`${
                            item?.offerPrice?.length !== 0
                              ? "text-xs line-through opacity-70"
                              : ""
                          }`}
                        >
                          {categoryInfo?.showProductPrices && item.showPrice
                            ? lan
                              ? `${(Number(item.price) * 10).toLocaleString(
                                  "en-us"
                                )} IRR`
                              : `${Number(item.price).toLocaleString(
                                  "fa-ir"
                                )} تومان`
                            : lan
                            ? "Call for price"
                            : "تماس بگیرید"}
                        </p>
                        <p>
                          {categoryInfo?.showProductPrices &&
                          item.showPrice &&
                          item.offerPrice?.length !== 0
                            ? lan
                              ? `${(
                                  Number(item.offerPrice) * 10
                                ).toLocaleString("en-us")} IRR`
                              : `${Number(item.offerPrice).toLocaleString(
                                  "fa-ir"
                                )} تومان`
                            : ""}
                        </p>
                      </div>
                    </div>

                    <button
                      className="w-full p-5 rounded-lg"
                      style={{ background: generalSetting.secondaryColor }}
                    >
                      {lan ? "View details" : "مشاهده محصول"}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div
            className={`w-full  relative ${
              productList?.filter((itm) => itm.offerPrice?.length !== 0)
                ? "mt-8"
                : "mt-40"
            } mb-32 grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4`}
          >
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
                <h4
                  className={`font-bold mb-2 ${
                    lan ? "text-left" : "text-right"
                  } w-full`}
                >
                  {lan ? item.en_name : item.name}
                </h4>
                <p
                  className={`${
                    lan ? "ltr text-left" : "text-right"
                  } w-full  color-[#F2F4F8] flex-1`}
                >
                  {lan ? (
                    <> {item.en_description?.slice(0, 200)}...</>
                  ) : (
                    <> {item.description?.slice(0, 200)}...</>
                  )}
                </p>
                <div className="w-full flex items-center justify-between">
                  <p className="p-2 rounded bg-gray-400 text-xs">
                    {item?.sellerCount} {lan ? "Sellers" : "فروشنده"}
                  </p>
                  <div className="text-left ">
                    {" "}
                    <p
                      className={`${
                        item?.offerPrice?.length !== 0
                          ? "text-xs line-through opacity-70"
                          : ""
                      }`}
                    >
                      {categoryInfo?.showProductPrices && item.showPrice
                        ? lan
                          ? `${(Number(item.price) * 10).toLocaleString(
                              "en-us"
                            )} IRR`
                          : `${Number(item.price).toLocaleString(
                              "fa-ir"
                            )} تومان`
                        : lan
                        ? "Call for price"
                        : "تماس بگیرید"}
                    </p>
                    <p>
                      {categoryInfo?.showProductPrices &&
                      item.showPrice &&
                      item.offerPrice?.length !== 0
                        ? lan
                          ? `${(Number(item.offerPrice) * 10).toLocaleString(
                              "en-us"
                            )} IRR`
                          : `${Number(item.offerPrice).toLocaleString(
                              "fa-ir"
                            )} تومان`
                        : ""}
                    </p>
                  </div>
                </div>

                <button
                  className="w-full p-5 rounded-lg"
                  style={{ background: generalSetting.secondaryColor }}
                >
                  {lan ? "View details" : "مشاهده محصول"}
                </button>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="justify-center bg-black p-4 md:w-full w-max mx-auto gap-4 text-white flex items-center flex-col rounded-lg  relative  mt-40 mb-32">
          <h1 className="text-xl md:text-sm">
            {lan
              ? "There is no products in this category"
              : "محصولی در این دسته بندی موجود نیست"}
          </h1>
          <Link
            href={"/"}
            className="w p-3 px-6 rounded-lg md:mt-4"
            style={{ background: generalSetting.secondaryColor }}
          >
            {lan ? "Return to homepage" : "بازگشت به صفحه اصلی"}
          </Link>
        </div>
      )}
    </div>
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

    const hotOffers = await axios.get(
      apiConfig.baseUrl +
        "hotoffers?category=" +
        categoryRes.data.result[0]?._id
    );
    console.log(productRes.data);

    store.dispatch({
      type: "hotOffers",
      payload: JSON.stringify(hotOffers.data.result),
    });
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
  hotOffers: state.productState.hotOffers,
  lan: state.publicState.lan,
});

export default connect(mapStateToProps)(ProductsCategory);
